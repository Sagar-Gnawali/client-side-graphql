import { DeleteIssueMutation } from "@/gql/deleteIssueMutation";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import { DeleteIcon } from "lucide-react";
import { useMutation } from "urql";

export const DeleteModal = ({ issueId }: { issueId: string }) => {
    const [{ fetching }, deleteIssue] = useMutation(DeleteIssueMutation);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const onClick = async () => {
        const res = await deleteIssue({ deleteIssueId: issueId });
        onClose();
    };
    return (
        <>
            <button onClick={onOpen} className="text-white bg-red-800 p-1 rounded-md">
                <DeleteIcon size={14} />
            </button>
            <Modal
                size="md"
                isOpen={isOpen}
                placement="top-center"
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="flex justify-center items-start my-5">
                                <h3 className=" text-black/70">
                                    Are you sure to delete this ?
                                </h3>
                            </ModalBody>
                            <ModalFooter className="border-t">
                                <Button variant="ghost" onPress={() => onOpenChange()}>
                                    No
                                </Button>
                                <Button
                                    isLoading={fetching}
                                    variant="solid"
                                    onClick={onClick}
                                    className="bg-black text-white"
                                >
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};
