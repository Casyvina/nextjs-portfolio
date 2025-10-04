import * as React from "react";

interface EmailTemplateProps {
    name: string;
    business?: string;
    budget?: string;
    message: string;
}

export function EmailTemplate({ name, business, budget, message }: EmailTemplateProps) {
    return (
        <div style={{ fontFamily: "Arial, sans-serif", lineHeight: 1.6 }}>
            <h2>New Contact Request from Buyeni 🚀</h2>
            <p><strong>Name:</strong> {name}</p>
            {business && <p><strong>Business:</strong> {business}</p>}
            {budget && <p><strong>Budget:</strong> {budget}</p>}
            <hr />
            <p><strong>Message:</strong></p>
            <p>{message}</p>
            <br />
            <p style={{ color: "#666", fontSize: "12px" }}>
                This email was sent via Buyeni.com Contact Form
            </p>
        </div>
    );
}
