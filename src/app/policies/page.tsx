export default function PoliciesPage() {
  return (
    <>
     <section className="w-full px-2 sm:px-6 py-20 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-text-primary mb-8">Policies</h1>
        <div className="prose prose-lg text-text-secondary">
          <h2>Privacy Policy</h2>
          <p>
            Your privacy is important to us. We collect only the necessary
            information to provide our services and do not share your data with
            third parties without your consent.
          </p>
          <h2>Terms of Service</h2>
        </div>
      </div>
    </section>
    </>
  );
}
