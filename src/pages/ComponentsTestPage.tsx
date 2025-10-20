import { Button, Card } from "@/components";
import React, { useState } from "react";

const ComponentsTestPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email.includes("@")) {
      setEmailError("Invalid email");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Submitted: \nEmail: ${email}\nPassword: ${password}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">UI Components Test</h1>

        <Card>
          <h2>Buttons</h2>
          <div>
            <div>
              <p>Variants</p>
              <div>
                <Button>Primary</Button>
                <Button>Secondary</Button>
                <Button>Danger</Button>
                <Button>Ghost</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsTestPage;
