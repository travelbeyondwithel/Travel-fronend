import '../../styles/ShareBar.css';

import {
    FaFacebookF,
    FaWhatsapp,
    FaLinkedinIn,
    FaInstagram,
    FaXTwitter,
    FaLink,
} from 'react-icons/fa6';

function ShareBar({ article }) {

    const url = window.location.href;

    const title = article?.title || "";

    const copyLink = async () => {

        await navigator.clipboard.writeText(url);

        alert('Link copied!');
    };

    return (

        <aside className="share-bar">

            <span className="share-title">
                Share:
            </span>

            <div className="container-bar">
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaFacebookF />
                </a>

                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaXTwitter />
                </a>

                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaLinkedinIn />
                </a>

                <a
                    href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaWhatsapp />
                </a>

                <button onClick={copyLink}>

                    <FaLink />

                </button>
            </div>


                


        </aside>
    )
}

export default ShareBar;