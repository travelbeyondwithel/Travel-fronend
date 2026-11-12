import { useEffect, useState } from "react";
import { submitPartnerApplication, getTravelSupport } from "../../api/partnerApi";
import "../../styles/TravelPartners.css";

import { FaMugHot } from "react-icons/fa6";

export default function TravelPartners() {
    const [form, setForm] = useState({
        business_name: "",
        contact_name: "",
        email: "",
        phone: "",
        business_type: "",
        location: "",
        country: "",
        website_url: "",
        booking_url: "",
        description: "",
        instagram_url: "",
        facebook_url: "",
        requested_package: "standard",
        consent_to_publish: false,
        accepted_terms: false,
    });

    const [support, setSupport] = useState(null);

    const [logo, setLogo] = useState(null);
    const [mainImage, setMainImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleCheckbox = (event) => {
        const { name, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const formData = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                formData.append(key, value);
            });

            if (logo) {
                formData.append("logo", logo);
            }

            if (mainImage) {
                formData.append("main_image", mainImage);
            }

            await submitPartnerApplication(formData);

            setSuccess(
                "Thank you. Your partnership request has been submitted. " +
                "We will review your information and contact you."
            );

            setForm({
                business_name: "",
                contact_name: "",
                email: "",
                phone: "",
                business_type: "",
                location: "",
                country: "",
                website_url: "",
                booking_url: "",
                description: "",
                instagram_url: "",
                facebook_url: "",
                requested_package: "standard",
                consent_to_publish: false,
                accepted_terms: false,
            });

            setLogo(null);
            setMainImage(null);

            event.target.reset();
        } catch (err) {
            console.error(err);

            const responseData = err.response?.data;

            if (responseData && typeof responseData === "object") {
                const messages = Object.entries(responseData)
                    .map(([field, message]) => {
                        const text = Array.isArray(message)
                            ? message.join(" ")
                            : message;

                        return `${field}: ${text}`;
                    })
                    .join("\n");

                setError(messages);
            } else {
                setError(
                    "Something went wrong while submitting your application. " +
                    "Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadSupport = async () => {
            try {
                const response = await getTravelSupport();
                setSupport(response.data);
            } catch (error) {
                console.error(
                    'Failed to load support configuration:',
                    error
                );
            }
        };
        loadSupport();
    }, []);

    return (
        <main className="travel-partners">
            <section className="travel-partners__hero">
                <span className="travel-partners__eyebrow">
                    Travel Beyond with El
                </span>

                <h1>Become a Travel Partner</h1>

                <p>
                    Connect your travel business with people discovering
                    places, experiences and opportunities through Travel
                    Beyond with El.
                </p>
            </section>

            <section className="travel-partners__content">
                <div className="travel-partners__intro">
                    <h2>Partner with us</h2>

                    <p>
                        We welcome hotels, guesthouses, lodges, resorts,
                        tour operators, activity providers and other
                        travel businesses.
                    </p>

                    <p>
                        Submit your business information below and we'll
                        review your application before publishing it.
                    </p>
                </div>

                <form
                    className="partner-form"
                    onSubmit={handleSubmit}
                >
                    <div className="partner-form__section">
                        <h2>Business information</h2>

                        <label>
                            Business name *
                            <input
                                type="text"
                                name="business_name"
                                value={form.business_name}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Business type *
                            <select
                                name="business_type"
                                value={form.business_type}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Select business type
                                </option>

                                <option value="Hotel">
                                    Hotel
                                </option>

                                <option value="Guesthouse">
                                    Guesthouse
                                </option>

                                <option value="Lodge">
                                    Lodge
                                </option>

                                <option value="Resort">
                                    Resort
                                </option>

                                <option value="Tour Operator">
                                    Tour Operator
                                </option>

                                <option value="Activity Provider">
                                    Activity Provider
                                </option>

                                <option value="Restaurant">
                                    Restaurant
                                </option>

                                <option value="Transport">
                                    Transport
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        </label>

                        <label>
                            Business description *
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="6"
                                required
                            />
                        </label>
                    </div>

                    <div className="partner-form__section">
                        <h2>Location</h2>

                        <label>
                            City / Location *
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Country *
                            <input
                                type="text"
                                name="country"
                                value={form.country}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>

                    <div className="partner-form__section">
                        <h2>Contact information</h2>

                        <label>
                            Contact person *
                            <input
                                type="text"
                                name="contact_name"
                                value={form.contact_name}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Email *
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Phone
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="partner-form__section">
                        <h2>Online presence</h2>

                        <label>
                            Website
                            <input
                                type="url"
                                name="website_url"
                                value={form.website_url}
                                onChange={handleChange}
                                placeholder="https://"
                            />
                        </label>

                        <label>
                            Booking URL
                            <input
                                type="url"
                                name="booking_url"
                                value={form.booking_url}
                                onChange={handleChange}
                                placeholder="https://"
                            />
                        </label>

                        <label>
                            Instagram
                            <input
                                type="url"
                                name="instagram_url"
                                value={form.instagram_url}
                                onChange={handleChange}
                                placeholder="https://instagram.com/"
                            />
                        </label>

                        <label>
                            Facebook
                            <input
                                type="url"
                                name="facebook_url"
                                value={form.facebook_url}
                                onChange={handleChange}
                                placeholder="https://facebook.com/"
                            />
                        </label>
                    </div>

                    <div className="partner-form__section">
                        <h2>Business media</h2>

                        <label>
                            Business logo
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    setLogo(
                                        event.target.files?.[0] || null
                                    )
                                }
                            />
                        </label>

                        <label>
                            Main property / business image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(event) =>
                                    setMainImage(
                                        event.target.files?.[0] || null
                                    )
                                }
                            />
                        </label>
                    </div>

                    <div className="partner-form__section">
                        <h2>Partnership type</h2>

                        <label>
                            Requested listing
                            <select
                                name="requested_package"
                                value={form.requested_package}
                                onChange={handleChange}
                            >
                                <option value="standard">
                                    Standard Listing
                                </option>

                                <option value="featured">
                                    Featured Partner
                                </option>

                                <option value="sponsored">
                                    Sponsored Feature
                                </option>
                            </select>
                        </label>

                        {support?.enabled && (
                            <section className="partner-support">
                                <div className="partner-support__content">
                                    <span className="partner-support__eyebrow">
                                        Optional Support
                                    </span>

                                    <h2>{support.title}</h2>

                                    <p>{support.description}</p>

                                    <div className="partner-support__amounts">
                                        {support.amounts.map((amount) => (
                                            <a
                                                key={amount}
                                                href={support.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="partner-support__amount"
                                            >
                                                ${amount}
                                            </a>
                                        ))}
                                    </div>

                                    <a 
                                        href={support.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="partner-support__button"
                                    >
                                        <FaMugHot/> Buy us a Coffee
                                    </a>

                                    <small>
                                        Supporting us is completely optional and does not affect
                                        your partnership application or package.
                                    </small>
                                </div>
                            </section>
                        )}

                        <p className="partner-form__note">
                            Selecting Sponsored Feature does not automatically
                            create a paid campaign. We'll contact you to
                            discuss the details.
                        </p>
                    </div>

                    <div className="partner-form__consent">
                        <label>
                            <input
                                type="checkbox"
                                name="consent_to_publish"
                                checked={form.consent_to_publish}
                                onChange={handleCheckbox}
                                required
                            />

                            <span>
                                I authorize Travel Beyond with El to publish
                                the information and images supplied in this
                                application.
                            </span>
                        </label>

                        <label>
                            <input
                                type="checkbox"
                                name="accepted_terms"
                                checked={form.accepted_terms}
                                onChange={handleCheckbox}
                                required
                            />

                            <span>
                                I agree to the Travel Beyond with El partner
                                terms.
                            </span>
                        </label>
                    </div>

                    {error && (
                        <div className="partner-form__error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="partner-form__success">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit Partnership Request"}
                    </button>
                </form>
            </section>
        </main>
    );
}