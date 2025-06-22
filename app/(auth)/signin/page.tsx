"use client";

import { SigninMutation } from "@/gql/signinMutation";
import { setToken } from "@/utils/token";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "urql";

const SigninPage = () => {
  const [state, setState] = useState({ password: "", email: "" });
  const [signinResult, signIn] = useMutation(SigninMutation)
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn({ data: state })
    if (res.data?.signin?.token) {
      setToken(res.data.signin.token);
      router.push("/");
    }
  };

  return (
    <div className="bg-white rounded-md border p-4 w-full shadow-sm">
      <title>Signin</title>
      <div className="text-2xl text-black/70">Sign in</div>
      <form onSubmit={handleSignin} className="flex flex-col gap-4 mt-4">
        <div>
          <Input
            value={state.email}
            onValueChange={(v) => setState((s) => ({ ...s, email: v }))}
            variant="faded"
            label="Email"
            classNames={{
              inputWrapper: "bg-slate-50 border-slate-100",
            }}
          />
        </div>
        <div>
          <Input
            variant="faded"
            value={state.password}
            onValueChange={(v) => setState((s) => ({ ...s, password: v }))}
            label="Password"
            type="password"
            classNames={{ inputWrapper: "bg-slate-50 border-slate-100" }}
          />
        </div>
        <div className="text-end">
          <Button type="submit" variant="solid" color="primary">
            Signin
          </Button>
        </div>
      </form>
      <div className="text-center my-3">
        New to Paraller ?{" "}
        <Link className="text-blue-500 underline" href={"/signup"}>
          Register now{" "}
        </Link>
      </div>
    </div>
  );
};

export default SigninPage;
