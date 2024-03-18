import { useEffect } from "react";
import { useHotel } from "../../context/HotelsProvider";

const GalleryDetaile = () => {
  const { id } = useParams();

  const { isLoadingCurrentHotel, currentHotel, getSingleHotel } = useHotel();
  const pictures = currentHotel.picture_detaile;
  console.log(pictures);

  useEffect(() => {
    getSingleHotel(id);
  }, [id]);
  return (
    <div className="gallery">
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
      <div className="detaileImage"></div>
    </div>
  );
};

export default GalleryDetaile;
