import TalkForm from "@/components/talks/TalkForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-4">
            Submit a Lightning Talk
          </h1>
          <p className="text-muted-foreground">
            Share your knowledge with the community through a concise and
            impactful lightning talk. Fill out the form below to submit your
            talk for consideration.
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 md:p-8">
          <TalkForm />
        </div>
      </div>
    </div>
  );
}
