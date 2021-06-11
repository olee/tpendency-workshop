export default function fac(value: number): number {
    if (value < 0) {
        return -1;
    } else if (value === 0) {
        return 1;
    } else {
        return (value * fac(value - 1));
    }
}
