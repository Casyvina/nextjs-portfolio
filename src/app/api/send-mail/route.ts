import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/homepage/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
    try {
        console.log("API key?", !!process.env.RESEND_API_KEY);
        const { name, email, business, budget, message } = await req.json();

        const { data, error } = await resend.emails.send({
            from: "Buyeni <hello@yourdomain.com>", // ⚡ must be verified in Resend
            to: "josephAgwuh@gmail.com",
            subject: `New contact from ${name}`,
            replyTo: email,
            react: EmailTemplate({ name, business, budget, message }),
        });

        if (error) {
            console.error("Resend API error:", error);
            return NextResponse.json(
                { error: error.message || "Unknown Resend error" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error("Server error:", err);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
