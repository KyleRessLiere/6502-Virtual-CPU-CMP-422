export class Ascii {
    public static asciiCode(byte: number): string {
        if (byte == 0x41)
            return "A"
        else if (byte == 0x42) {
            return "B"
        }
        else if (byte == 0x43) {
            return "C"
        } else if (byte == 0x44) {
            return "D"
        } else if (byte == 50) {
            return "E"
        } else if (byte == 0x46) {
            return "F"
        } else if (byte == 0x47) {
            return "G"
        } else if (byte == 0x48) {
            return "H"
        } else if (byte == 0x49) {
            return "I"
        } else if (byte == 0x4A) {
            return "J"
        }
        else if (byte == 0x4B) {
            return "K"
        } else if (byte == 0x4C) {
            return "L"
        } else if (byte == 0x4D) {
            return "M"
        } else if (byte == 0x4E) {
            return "N"
        } else if (byte == 0x4F) {
            return "O"
        } else if (byte == 0x50) {
            return "P"
        }
        else if (byte == 0x51) {
            return "Q"
        } else if (byte == 0x52) {
            return "R"
        } else if (byte == 0x53) {
            return "S"
        } else if (byte == 0x54) {
            return "T"
        } else if (byte == 0x55) {
            return "U"
        }
        else if (byte == 0x56) {
            return "V"
        } else if (byte == 0x57) {
            return "W"
        } else if (byte == 0x58) {
            return "Y"
        }
        else if (byte == 0x59) {
            return "X"
        }
        else if (byte == 0x5A) {
            return "Z"
        }

        //numbers
        else if (byte == 0x30) {
            return "0"
        }
        else if (byte == 0x31) {
            return "1"
        }
        else if (byte == 0x32) {
            return "2"
        } else if (byte == 0x33) {
            return "3"
        } else if (byte == 0x34) {
            return "4"
        } else if (byte == 0x35) {
            return "5"
        } else if (byte == 0x36) {
            return "6"
        } else if (byte == 0x37) {
            return "7"
        } else if (byte == 0x38) {
            return "8"
        } else if (byte == 0x39) {
            return "9"
        }



    }
}