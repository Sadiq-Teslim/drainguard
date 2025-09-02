import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, MessageSquareText, UploadCloud, CheckCircle2 } from 'lucide-react';

export default function ReportPage() {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server.
    // For the demo, we'll just log it and show the success message.
    console.log("Report Submitted:", { location, description });
    setIsSubmitted(true);
  };

  // Render the success message view
  if (isSubmitted) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Thank You!</h1>
          <p className="text-gray-600 mt-2">
            Your report has been received. Citizen reports like yours help us identify issues faster and keep the city safe.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Report Another Issue
          </button>
           <Link to="/dashboard" className="block mt-4 text-sm text-gray-500 hover:underline">
            &larr; Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Render the form view
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800">Report a Blocked Drain</h1>
          <p className="text-gray-600 mt-2">
            See a problem? Help us fix it. Fill out the form below to report a clogged or damaged drain in your area.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="inline-block mr-2 h-5 w-5 text-gray-400" />
                Location or Address
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., 'Corner of Bode Thomas Street, Surulere'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                <MessageSquareText className="inline-block mr-2 h-5 w-5 text-gray-400" />
                Description of the Issue
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the blockage (e.g., 'Drain is full of plastic bottles and sand, causing water to overflow onto the street.')"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload a Photo (Optional)
              </label>
              {/* This is a fake file input for demo purposes */}
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                      Click to upload
                    </span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              disabled={!location || !description}
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}