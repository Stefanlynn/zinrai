import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            The page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-6 flex justify-center">
            <a 
              href="/"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-black/80 transition-colors"
            >
              Go back to home
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
