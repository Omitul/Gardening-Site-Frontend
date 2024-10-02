import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type LoginData = {
  email: string;
  password: string;
};

export type registerData = {
  username: string;
  email: string;
  password: string;
};
