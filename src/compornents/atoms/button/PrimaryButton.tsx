import { FC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
    children: ReactNode;
    onClick: () => void;
};

export const PrimaryButton: FC<Props> = (props) => {
    const { children, onClick } = props;
    return <Button
    bg="teal.400"
    color="white"
    _hover={{ opacity: 0.8 }}
    onClick={onClick}
  >{children}</Button>;
};
