document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      const user = JSON.parse(localStorage.getItem('user'));

      if (user && user.email === email && user.password === password) {
        alert(`Welcome back, ${user.name}!`);
        window.location.href = 'index.html';
      } else {
        alert('Invalid credentials.');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      const existingUser = localStorage.getItem('user');
      if (existingUser) {
        alert('User already exists. Please log in.');
        return;
      }

      localStorage.setItem('user', JSON.stringify({ name, email, password }));
      alert('Signup successful!');
      window.location.href = 'login.html';
    });
  }
});
