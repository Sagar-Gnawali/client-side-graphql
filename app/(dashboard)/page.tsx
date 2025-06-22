"use client";

import PageHeader from "../_components/PageHeader";
import { useMutation, useQuery } from "urql";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import Issue from "../_components/Issue";
import { IssueMutation } from "@/gql/issueMutation";
import { IssuesQuery } from "@/gql/issueQuery";
interface IssuesTypes {
  issues: {
    name: string;
    id: string;
    status: string;
  }[];
}
const IssuesPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [issueName, setIssueName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [createIssueResult, createIssue] = useMutation(IssueMutation);
  const { fetching } = createIssueResult;

  const onCreate = async (close: () => void) => {
    const payload = {
      name: issueName,
      content: issueDescription,
    };
    const res = await createIssue({ data: payload });
    if (res.data?.createIssue?.id) {
      setIssueName("");
      setIssueDescription("");
      close();
    }
  };
  const [{ data, error, fetching: isIssuesFetching }] = useQuery<IssuesTypes>({
    query: IssuesQuery,
  });
  return (
    <div>
      <title>Issues</title>
      <PageHeader title="All issues">
        <Tooltip content="New Issue">
          <button
            className="text-white bg-black p-1 rounded-md"
            onClick={onOpen}
          >
            <PlusIcon size={14} />
          </button>
        </Tooltip>
      </PageHeader>
      {isIssuesFetching && <div className="h-screen flex items-center justify-center"><Spinner /></div>}
      {data?.issues &&
        data.issues.map((issue) => (
          <div key={issue.id}>
            <Issue issue={issue} />
          </div>
        ))}

      <Modal
        size="2xl"
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-sm text-black/70">New issue</span>
              </ModalHeader>
              <ModalBody>
                <div>
                  <input
                    autoFocus
                    type="text"
                    className="w-full border-none outline-none focus:outline-none focus:border-none py-2 text-xl text-black/70"
                    placeholder="Issue name"
                    value={issueName}
                    onChange={(e) => setIssueName(e.target.value)}
                  />
                </div>
                <div className="bg-white">
                  <Textarea
                    size="lg"
                    variant="bordered"
                    placeholder="Issue description"
                    className="bg-white"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    classNames={{
                      inputWrapper: "bg-white border-none shadow-none p-0",
                      base: "bg-white p-0",
                      input: "bg-white p-0",
                      innerWrapper: "bg-white p-0",
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter className="border-t">
                <Button variant="ghost" onPress={() => onOpenChange()}>
                  Cancel
                </Button>
                <Button
                  isLoading={fetching}
                  variant="solid"
                  className="bg-black text-white"
                  onPress={() => onCreate(onClose)}
                >
                  Create Issue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default IssuesPage;
