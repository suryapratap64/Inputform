"use client";
import CustomsDeclarationForm from "@/components/customs-form/CustomsDeclarationForm";
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Customs Declaration Form
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your Indian Shipping Bill/Bill of Entry with our
            streamlined multi-step process. Ensure compliance and reduce errors
            with built-in validation.
          </p>
        </div>
        <CustomsDeclarationForm />
      </div>
    </div>
  );
}
