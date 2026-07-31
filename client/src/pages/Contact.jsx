import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/auth/contact",
        {
          name,
          email,
          message,
        }
      );

      setSuccessMessage("Message sent successfully ✅");

      setName("");
      setEmail("");
      setMessage("");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      alert("Failed to send message");
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-[calc(100vh-80px)] bg-slate-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Contact Us
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            <div>
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                Get In Touch
              </h2>

              <p className="text-slate-300 leading-8">
                Have questions about GIS, Remote Sensing or Geospatial
                Analysis? Send us a message and we will get back to you.
              </p>

              <div className="mt-8 space-y-4">
                <p>📍 Islamabad, Pakistan</p>
                <p>📞 +92 300 1234567</p>
                <p>✉️ contact@geosenseai.com</p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800">

              <form
                className="space-y-5"
                onSubmit={handleSubmit}
              >

                {successMessage && (
                  <div className="bg-green-500 text-white p-3 rounded-xl text-center">
                    {successMessage}
                  </div>
                )}

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your Name"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Your Email"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-400"
                />

                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Your Message"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-cyan-400"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-semibold transition-colors text-slate-950"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default Contact;