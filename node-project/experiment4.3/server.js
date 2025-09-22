const express = require("express");
const app = express();
app.use(express.json());

let seats = [
  { id: 1, status: "available" },
  { id: 2, status: "available" },
  { id: 3, status: "available" }
];

// View all seats
app.get("/seats", (req, res) => {
  res.json(seats);
});

// Lock a seat
app.post("/lock", (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats.find(s => s.id === seatId);

  if (!seat) return res.status(404).json({ message: "Seat not found" });
  if (seat.status !== "available")
    return res.status(400).json({ message: "Seat not available" });

  seat.status = "locked";
  seat.lockedBy = userId;
  res.json({ message: "Seat locked", seat });
});

// Confirm a booking
app.post("/confirm", (req, res) => {
  const { seatId, userId } = req.body;
  const seat = seats.find(s => s.id === seatId);

  if (!seat) return res.status(404).json({ message: "Seat not found" });
  if (seat.status !== "locked" || seat.lockedBy !== userId)
    return res.status(400).json({ message: "You must lock the seat first" });

  seat.status = "booked";
  delete seat.lockedBy;
  res.json({ message: "Seat booked", seat });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
