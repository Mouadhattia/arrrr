const ColorBullet = ({ color, size, style }) => {
    return (
        <div style={{
            width: size, height: size, borderRadius: size / 2, backgroundColor: color
            , ...style
        }} />
    )
}

export default ColorBullet;