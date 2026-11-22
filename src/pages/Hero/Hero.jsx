import "./hero.css";
import photo from "../../assets/img/banner.jpg";

const Hero = () => {
  return (
    <section className="hero">
      <img src={photo} alt="vetement vinted" />
    </section>
  );
};

export default Hero;
