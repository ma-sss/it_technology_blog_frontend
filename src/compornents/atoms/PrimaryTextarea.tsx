import { Textarea } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";

type Props = {
    placeholder: string;
    value: string;
    onChange: ((e: ChangeEvent<HTMLTextAreaElement>) => void);
};

export const PrimaryTextarea: FC<Props> = memo((props) => {
    const { placeholder, value, onChange } = props;
    return (
        <Textarea
            placeholder={placeholder}
            mb={4}
            value={value}
            onChange={onChange}
        />
    );
});
