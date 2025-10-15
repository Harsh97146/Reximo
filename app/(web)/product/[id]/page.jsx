"use client";
import { useParams } from "next/navigation";
import DetailSection from "./../../../components/DetailSection";

const DetailPage = () => {
  const params = useParams();
  return (
    <div>
      <DetailSection id={params.id} />
    </div>
  );
};

export default DetailPage;
