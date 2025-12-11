import "./About.css";

export default function About() {
    return (
        <div className="about-container">
            <h1 className="about-title">About Rick and Morty</h1>
            <div className="about-content">
                <img
                    className="about-image"
                    src="https://upload.wikimedia.org/wikipedia/ru/7/70/Rick_and_Morty_Season_1.jpg"
                    alt="Rick and Morty poster"
                />
                <div className="about-text">
                    <p>
                        <strong>Rick and Morty</strong> is a critically acclaimed sci-fi animated
                        series created by Justin Roiland and Dan Harmon. The story follows the
                        chaotic adventures of Rick Sanchez — a brilliant but unhinged scientist —
                        and his good-hearted but impressionable grandson, Morty. Together, they
                        travel across infinite dimensions, alternate realities, and bizarre alien worlds.
                    </p>
                    <p>
                        The series blends dark humor, high-concept science fiction, satire,
                        emotional storytelling, and philosophical themes. Each episode delivers a mix
                        of absurdity, unexpected twists, and clever writing while exploring identity,
                        morality, and the complexity of existence.
                    </p>
                    <p>
                        On this website, you can explore characters, episodes, and locations using the
                        open <strong>Rick and Morty API</strong>. Dive into the multiverse and discover
                        everything that makes the series iconic.
                    </p>
                </div>
            </div>
        </div>
    );
}
