import { Button, Result } from "antd";
import { HomeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router";

export default function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-[calc(100vh-80px)] bg-linear-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Result
          status="404"
          title={
            <div className="space-y-2">
              <h1 className="text-6xl font-bold bg-linear-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                404
              </h1>
              <h2 className="text-2xl font-semibold text-slate-700">
                Page Not Found
              </h2>
            </div>
          }
          subTitle={
            <div className="space-y-4">
              <p className="text-slate-500 text-lg">
                Sorry, the page you're looking for doesn't exist or has been
                moved.
              </p>
              <p className="text-sm text-slate-400 font-mono bg-slate-100 px-4 py-2 rounded-lg inline-block">
                {location.pathname}
              </p>
            </div>
          }
          extra={[
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={() => navigate("/")}
              className="h-12 px-8 text-base font-medium shadow-lg hover:shadow-xl transition-all"
              key="home"
            >
              Back to Home
            </Button>,
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              className="h-12 px-8 text-base font-medium"
              key="back"
            >
              Go Back
            </Button>,
          ]}
          className="py-12"
        />

        {/* Decorative Elements */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span>Lost? Let's get you back on track</span>
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
