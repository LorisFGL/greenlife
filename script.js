function calculerEconomie() {
    const degrees = document.getElementById('degrees').value;
    const resultat = document.getElementById('resultat');
    
    if (!degrees || degrees < 1 || degrees > 5) {
        alert('Veuillez entrer une valeur entre 1 et 5°C');
        return;
    }
    
    const pourcentage = degrees * 7;
    const economie = Math.round(1000 * pourcentage / 100);
    let message = '';
    
    if (degrees === 1) {
        message = 'Un petit geste, mais déjà un bon début';
    } else if (degrees <= 3) {
        message = 'Une belle réduction qui fait la différence';
    } else {
        message = 'Un effort exemplaire, bravo pour votre engagement';
    }
    
    resultat.innerHTML = `🌱 En baissant votre chauffage de <strong>${degrees}°C</strong>, vous économisez environ <strong>${pourcentage}%</strong>, soit <strong>${economie} €</strong>. 👏 ${message} !`;
    resultat.classList.add('show');
}

document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const statNumbers = document.querySelectorAll('.stat-number');
    const contactForm = document.querySelector('#contact-form');

    if (burgerMenu && navMenu) {
        burgerMenu.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            burgerMenu.classList.toggle('active');
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (statNumbers.length > 0) {
            statNumbers.forEach(stat => {
                const rect = stat.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

                if (isVisible && !stat.classList.contains('animated')) {
                    animateValue(stat, 0, parseInt(stat.dataset.value), 1500);
                    stat.classList.add('animated');
                }
            });
        }
    });

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();
            let isValid = true;
            let errorMessage = '';

            if (name.length < 2) {
                isValid = false;
                errorMessage += 'Le nom doit contenir au moins 2 caractères.\n';
            }

            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                isValid = false;
                errorMessage += 'L\'email n\'est pas valide.\n';
            }

            if (message.length < 10) {
                isValid = false;
                errorMessage += 'Le message doit contenir au moins 10 caractères.\n';
            }

            if (isValid) {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            } else {
                alert('Erreur :\n' + errorMessage);
            }
        });
    }

    const quizForm = document.querySelector('#quiz-form');
    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const answers = {
                'q1': 'b',
                'q2': 'a',
                'q3': 'c',
                'q4': 'b',
                'q5': 'a'
            };

            let score = 0;
            let totalQuestions = Object.keys(answers).length;

            for (let question in answers) {
                const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
                if (selectedAnswer && selectedAnswer.value === answers[question]) {
                    score++;
                }
            }

            const percentage = (score / totalQuestions) * 100;
            let message = '';

            if (percentage >= 80) {
                message = 'Excellent ! Vous êtes un expert de la consommation responsable !';
            } else if (percentage >= 60) {
                message = 'Bien ! Vous avez de bonnes connaissances sur le sujet.';
            } else if (percentage >= 40) {
                message = 'Pas mal ! Continuez à vous informer sur la consommation responsable.';
            } else {
                message = 'Il y a encore des choses à apprendre ! Consultez notre page Solutions.';
            }

            const resultDiv = document.querySelector('#quiz-result');
            if (resultDiv) {
                resultDiv.innerHTML = `
                    <h3>Votre score : ${score}/${totalQuestions} (${percentage}%)</h3>
                    <p>${message}</p>
                    <a href="solutions.html" class="btn">Découvrir nos solutions</a>
                `;
                resultDiv.style.display = 'block';
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                }
            }
        });
    });
}); 