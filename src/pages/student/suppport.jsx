export default function Support() {
  return (
    <div className="min-h-screen flex justify-center items-start p-5 bg-white">
      <div className="w-full max-w-5xl space-y-10">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">Support & Help Center</h1>

        {/* Contact Options */}
        <div className="space-y-6 pb-8 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Contact Support</h2>
          <p className="text-gray-600">
            If you're facing issues or have questions, we're here to help.
            Reach out through any of the following methods.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Email</h3>
              <p className="text-gray-600">support@librarysystem.com</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Phone</h3>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Live Chat</h3>
              <p className="text-gray-600">Available during working hours via website chat widget.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-700">Frequently Asked Questions</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">How do I reset my password?</h3>
              <p className="text-gray-600">You can reset your password from the Account Settings page under "Change Password."</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">How can I reserve a book?</h3>
              <p className="text-gray-600">Visit the Book Catalog, select your desired book, and click "Reserve" if it's available.</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700">Who do I contact for account-related issues?</h3>
              <p className="text-gray-600">For account or login issues, contact our support team using the email or phone provided above.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
