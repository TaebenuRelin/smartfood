import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const getNextReminder = () => {
  const now = new Date();
  // Setiap 2 jam, reminder berikutnya
  const next = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  return next.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const ReminderAir: React.FC = () => {
  const [show, setShow] = useState(false);
  const [nextTime, setNextTime] = useState(getNextReminder());

  useEffect(() => {
    // Set timer untuk reminder (2 jam sekali)
    const timeout = setTimeout(() => {
      setShow(true);
    }, 2 * 60 * 60 * 1000); // 2 jam dalam ms

    return () => clearTimeout(timeout);
  }, [nextTime]);

  const handleDismiss = () => {
    setShow(false);
    setNextTime(getNextReminder());
  };

  // Tampilkan notifikasi popup sederhana jika waktunya
  return (
    <>
      {show && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card className="shadow-lg border-blue-400 border-2">
            <CardHeader>
              <CardTitle>Sudah Saatnya Minum Air!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Jangan lupa minum air putih agar tetap sehat 💧
              </p>
              <Button onClick={handleDismiss}>Oke, sudah minum!</Button>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Info jadwal berikutnya */}
      <div className="text-sm text-muted-foreground mt-2 text-right">
        Reminder air berikutnya: <b>{nextTime}</b>
      </div>
    </>
  );
};

export default ReminderAir;
