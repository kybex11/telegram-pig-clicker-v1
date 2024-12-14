import { useEffect, useState } from 'preact/hooks';

export default function Event({ text }: { text: string }) {
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    useEffect(() => {
        // Устанавливаем случайные координаты
        setPosition({
            top: Math.random() * (window.innerHeight - 100), // Учитываем высоту текста
            left: Math.random() * (window.innerWidth - 200), // Учитываем ширину текста
        });

        // Сначала показываем текст, затем запускаем затухание
        setFadeOut(false);
        const fadeOutTimeout = setTimeout(() => setFadeOut(true), 500); // Задержка перед затуханием (пол секунды)

        // Очищаем таймер при размонтировании
        return () => clearTimeout(fadeOutTimeout);
    }, [text]); // Обновляем при изменении текста

    return (
        <div style={{
            position: 'fixed', // Изменено на fixed
            top: `${position.top}px`,
            left: `${position.left}px`,
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 0.5s ease-out',
            pointerEvents: 'none', // Чтобы клики не мешали
            zIndex: 9999, // Убедитесь, что элемент поверх других
        }}>
            <h1 className="event" style={{ margin: 0 }}>{text}</h1> {/* Убираем отступы */}
        </div>
    );
}