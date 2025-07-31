import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>VITAP Bike Taxi Booking</h1>
    <form id="bookingForm">
      <input type="text" id="name" placeholder="Your Name" required /><br>
      <select id="destination">
        <option value="vij_railway">Vijayawada Railway Station</option>
        <option value="vij_bus">Vijayawada Bus Stand</option>
        <option value="mangalagiri">Mangalagiri</option>
        <option value="guntur">Guntur</option>
        <option value="mandadam">Mandadam Centre</option>
      </select><br>
      <button type="submit">Book Ride</button>
    </form>
    <div id="result"></div>
  `;

  const fareMap = {
    vij_railway: 16,
    vij_bus: 16,
    mangalagiri: 14,
    guntur: 34,
    mandadam: 5.1,
  };

  document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const destination = document.getElementById('destination').value;
    const distance = fareMap[destination];
    const fare = 40 + 25 + (distance * 5);

    const { data, error } = await supabase.from('bookings').insert([
      { name, destination, distance, fare }
    ]);

    const result = document.getElementById('result');
    if (error) {
      result.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    } else {
      result.innerHTML = `<p style="color:green;">Booking confirmed! Fare: ₹${fare}</p>`;
    }
  });
});
