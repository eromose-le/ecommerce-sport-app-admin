import { FC } from "react";
import Image from "@/assets/images/placeholder.png";
import { Typography } from "@mui/material";
import {
  Calendar,
  Mail02,
  MarkerPin02,
  PhoneCall01,
} from "@untitled-ui/icons-react";
import moment from "moment";

interface ClientProfileDetailCardProps {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  avatar: string;
  createdAt?: Date | string;
  phone: string;
}

const ClientProfileDetailCard: FC<ClientProfileDetailCardProps> = ({
  firstName,
  lastName,
  avatar,
  email,
  phone,
  address,
  createdAt,
}) => {
  const userProfileDetails = [
    {
      id: 1,
      name: "Name",
      icon: null,
      content: `${firstName}, ${lastName}`,
    },
    {
      id: 2,
      name: "Email",
      icon: <Mail02 width={14} height={14} color="#027A48" />,
      content: email,
    },
    {
      id: 3,
      name: "Phone Number",
      icon: <PhoneCall01 width={14} height={14} color="#027A48" />,
      content: phone,
    },
    {
      id: 4,
      name: "Address",
      icon: <MarkerPin02 width={14} height={14} color="#027A48" />,
      content: `${address}`,
    },
    {
      id: 5,
      name: "Registration Date",
      icon: <Calendar width={14} height={14} color="#027A48" />,
      content: moment(createdAt).format("MMM D, h:mma"),
    },
  ];

  return (
    <section className="flex items-center flex-col lg:flex-row gap-5 shadow-sm bg-white mt-10 rounded-2xl">
      <div className="h-full max-w-[280px]">
        <img
          className="h-full min-h-[230px] rounded-tl-2xl rounded-bl-2xl"
          src={avatar || Image}
          alt="application-image"
        />
      </div>
      <div className="flex flex-col items-start justify-center space-y-3 p-5">
        {userProfileDetails.map((detail) => (
          <div key={detail.id} className="flex items-center gap-2">
            {detail.icon && <div>{detail.icon}</div>}
            <Typography
              color={detail.name === "Name" ? "grey.900" : "grey.600"}
              className={`${
                detail.name === "Name"
                  ? "font-bold text-2xl font-crimson capitalize"
                  : "font-medium text-sm font-inter"
              }`}
            >
              {detail.content}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientProfileDetailCard;
