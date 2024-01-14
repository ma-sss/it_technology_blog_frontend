import { Input } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";

type Props = {
    placeholder: string;
    value: string;
    onChange: ((e: ChangeEvent<HTMLInputElement>) => void);
};

export const PrimaryInput: FC<Props> = memo((props) => {
    const { placeholder, value, onChange } = props;
    return (
        <Input
            placeholder={placeholder}
            mb={4}
            value={value}
            onChange={onChange}
        />
    );
});
