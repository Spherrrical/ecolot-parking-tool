import Link from 'next/link';

export default function NoLangPage() {
    return (
        <div>
            <h1>Language Not Supported</h1>
            <p>
                We apologize, but the requested language is not supported yet. If you would like us to add support for this
                language, please email us at <a href="mailto:support@ecolot.com">support@ecolot.com</a>.
            </p>
            <p>
                In the meantime, you can visit our website in one of the supported languages:
            </p>
            <ul>
                <li>
                    <Link href="/" locale="en">
                        English
                    </Link>
                </li>
                <li>
                    <Link href="/" locale="es">
                        Español
                    </Link>
                </li>
                <li>
                    <Link href="/" locale="zh">
                        中文
                    </Link>
                </li>
                <li>
                    <Link href="/" locale="so">
                        Soomaali
                    </Link>
                </li>
                <li>
                    <Link href="/" locale="vi">
                        Tiếng Việt
                    </Link>
                </li>
            </ul>
        </div>
    );
}
