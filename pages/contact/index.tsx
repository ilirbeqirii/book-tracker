import { ContactData } from "@book-tracker/shared/contact";
import classes from "./contact.module.css";
import { useToastNotification } from "@book-tracker/components/ui/toast-notification/toast-notification";

function ContactPage() {
  const { showToast } = useToastNotification();

  const contactUsHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data: ContactData = Object.fromEntries(
      formData.entries()
    ) as unknown as ContactData;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      showToast(result.message, "success");
      form.reset();
    } catch {
      showToast("Error submitting contact form:", "error");
    }
  };

  return (
    <div className={["container", classes["container-centered"]].join(" ")}>
      <div className={["wrapper", classes["wrapper-limited"]].join(" ")}>
        <h2>Contact Us</h2>
        <p>
          Have questions, feedback, or just want to say hello? We&apos;d love to
          hear from you!
        </p>
        <form id="contact-form" onSubmit={contactUsHandler}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input-field"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inquiry-type" className="form-label">
              Type of Inquiry
            </label>
            <select
              id="inquiry-type"
              name="inquiryType"
              className="select-field"
              required
            >
              <option value="">-- Please select --</option>
              <option value="general">General</option>
              <option value="feature">Feature</option>
              <option value="bug">Bug</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="input-field"
              placeholder="Subject of your message"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="textarea-field"
              placeholder="Your message..."
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
