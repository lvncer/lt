import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            baseTheme: undefined,
            variables: {
              colorPrimary: "#8b5cf6",
              colorBackground: "#ffffff",
              colorInputBackground: "#ffffff",
              colorInputText: "#1f2937",
              colorText: "#1f2937",
              colorTextSecondary: "#6b7280",
              borderRadius: "0.5rem",
            },
            elements: {
              formButtonPrimary: {
                backgroundColor: "#8b5cf6",
                borderColor: "#8b5cf6",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#7c3aed",
                  borderColor: "#7c3aed",
                },
                "&:focus": {
                  backgroundColor: "#7c3aed",
                  borderColor: "#7c3aed",
                  boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                },
              },
              socialButtonsBlockButton: {
                borderColor: "#d1d5db",
                color: "#374151",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                  borderColor: "#9ca3af",
                },
              },
              card: {
                backgroundColor: "#ffffff",
                borderColor: "#e5e7eb",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              },
              headerTitle: {
                color: "#1f2937",
                fontSize: "1.5rem",
                fontWeight: "600",
              },
              headerSubtitle: {
                color: "#6b7280",
                fontSize: "0.875rem",
              },
              dividerLine: {
                backgroundColor: "#e5e7eb",
              },
              dividerText: {
                color: "#6b7280",
                fontSize: "0.875rem",
              },
              formFieldLabel: {
                color: "#374151",
                fontSize: "0.875rem",
                fontWeight: "500",
              },
              formFieldInput: {
                borderColor: "#d1d5db",
                "&:focus": {
                  borderColor: "#8b5cf6",
                  boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
                },
              },
              footerActionText: {
                color: "#6b7280",
                fontSize: "0.875rem",
              },
              footerActionLink: {
                color: "#8b5cf6",
                fontSize: "0.875rem",
                fontWeight: "500",
                "&:hover": {
                  color: "#7c3aed",
                },
              },
            },
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
