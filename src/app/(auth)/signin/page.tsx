import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OlA AI SignIn Page",
  description: "This is the sign-in page for OLA AI",
};

export default function SignIn() {
  return <SignInForm />;
}
