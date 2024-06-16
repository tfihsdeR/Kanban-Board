import { useEffect, useState } from "react"

const Input = ({
    name,
    type,
    placeholder,
    value,
    disabled,
    fullWidth,
    smallGap,
    fontSize,
    removeUnderline = false,
    textCenter = false,
    onChange,
}: {
    name: string,
    type: string,
    placeholder?: string,
    value?: string,
    disabled?: boolean,
    fullWidth?: boolean,
    smallGap?: boolean
    fontSize?: "sm" | "xl" | "2xl" | "base"
    removeUnderline?: boolean
    textCenter?: boolean
    onChange?: (e: any) => void
}) => {
    const _fontSize = fontSize === "sm" ? "text-sm" : fontSize === "xl" ? "text-xl" : fontSize === "2xl" ? "text-2xl" : fontSize === "base" ? "text-base" : "text-3xl"

    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            required
            className={`${smallGap ? "h-10" : "h-20"} bg-transparent ${textCenter && "text-center"} ${!removeUnderline && "border-b"} ${_fontSize} w-4/5 self-center focus:outline-none 
            ${disabled && "cursor-default"}
            ${fullWidth && "w-full"}`}
            onChange={onChange}
        >
        </input>
    )
}

export default Input


// const Input = ({
//     name,
//     type,
//     placeholder,
//     value,
//     disabled,
//     fullWidth,
//     smallGap,
//     fontSize,
//     removeUnderline = false,
//     textCenter = false,
// }: {
//     name: string,
//     type: string,
//     placeholder?: string,
//     value?: string,
//     disabled?: boolean,
//     fullWidth?: boolean,
//     smallGap?: boolean
//     fontSize?: "sm" | "xl" | "2xl" | "base"
//     removeUnderline?: boolean
//     textCenter?: boolean
// }) => {
//     const _fontSize = fontSize === "sm" ? "text-sm" : fontSize === "xl" ? "text-xl" : fontSize === "2xl" ? "text-2xl" : fontSize === "base" ? "text-base" : "text-3xl"

//     return (
//         <input
//             name={name}
//             type={type}
//             placeholder={placeholder}
//             value={value}
//             disabled={disabled}
//             required
//             className={`${smallGap ? "h-10" : "h-20"} bg-transparent ${textCenter && "text-center"} ${!removeUnderline && "border-b"} ${_fontSize} w-4/5 self-center focus:outline-none
//             ${disabled && "opacity-50 cursor-default"}
//             ${fullWidth && "w-full"}`}
//         >

//         </input>
//     )
// }

// export default Input
