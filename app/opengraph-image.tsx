import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'About Acme';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'white',
                    fontSize: 128,
                    letterSpacing: '-0.05em',
                    display: 'flex',
                    width: '100%',
                    fontWeight: 700,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    color: '#4F80E1',
                    fontFamily: 'Verdana, sans-serif',
                }}
            >
                About Acme
            </div>
        ),
        {
            ...size,
        }
    );
}
