const ErrorMessage = ({ error }) => (
  <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl">
    {error} - Showing demo data instead
  </div>
);

export default ErrorMessage;
