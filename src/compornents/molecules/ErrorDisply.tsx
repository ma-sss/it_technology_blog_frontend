import { FC, memo } from "react";
import { Alert, AlertIcon, Text } from "@chakra-ui/react";

type Props = {
    errorsArray: Array<string>;
};

export const ErrorDisplay: FC<Props> = memo((props) => {
    const { errorsArray } = props;

    return (
        <>
            {errorsArray.length > 0 && (
                <Alert status="error" mb={4} borderRadius="md">
                    <AlertIcon />
                    {errorsArray.map((error, index) => (
                        <Text key={index}>{`${error}。`}</Text>
                    ))}
                </Alert>
            )}
        </>
    );
});
