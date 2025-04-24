// Навигация - эффект прокрутки
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Навигация
document.addEventListener('DOMContentLoaded', function() {
  // Мобильное меню
  const mobileToggle = document.querySelector('.navbar__mobile-toggle');
  const navLinks = document.querySelector('.navbar__links');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // Фильтрация проектов в портфолио
  const filterButtons = document.querySelectorAll('.portfolio__filter button');
  const portfolioItems = document.querySelectorAll('.portfolio__item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Удаляем активный класс со всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс на нажатую кнопку
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // Анимация появления элементов при скролле
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 50) {
        element.classList.add('animated');
      }
    });
  };
  
  // Добавляем класс для анимации
  document.querySelectorAll('.portfolio__item, .team__member, .home__service').forEach(item => {
    item.classList.add('animate-on-scroll');
  });
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Запускаем один раз при загрузке
});

// Обработка отправки формы
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Здесь можно добавить код для отправки формы через AJAX
    // Для примера просто покажем сообщение об успешной отправке
    
    const formData = new FormData(contactForm);
    console.log('Форма отправлена со следующими данными:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Очистка формы и показ сообщения
    contactForm.reset();
    alert('Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
  });
}

// Анимация элементов при прокрутке
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.home__service, .portfolio__item, .team__member');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 100) {
      element.classList.add('animate');
    }
  });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Учитываем высоту навигации
        behavior: 'smooth'
      });
    }
  });
});

// Мобильное меню
const mobileMenuToggle = document.querySelector('.navbar__mobile-toggle');
const navbarLinks = document.querySelector('.navbar__links');

if (mobileMenuToggle && navbarLinks) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navbarLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Закрываем меню при клике на ссылку
  navbarLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navbarLinks.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// Анимация счетчиков на главной странице
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat__number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    if (!counter.classList.contains('animated')) {
      counter.classList.add('animated');
      
      let count = 0;
      const duration = 2000; // 2 секунды
      const increment = target / (duration / 16); // 60fps
      
      const updateCount = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCount();
    }
  });
};

// Запускаем анимацию счетчиков при прокрутке до них
const observeCounters = () => {
  const statsSection = document.querySelector('.home__about-stats');
  if (!statsSection) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(statsSection);
};

window.addEventListener('DOMContentLoaded', observeCounters);

// Галерея изображений для портфолио
const portfolioImages = document.querySelectorAll('.portfolio__image img');

portfolioImages.forEach(image => {
  image.addEventListener('click', () => {
    // Создаем модальное окно для просмотра изображения
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('image-modal__content');
    
    const fullImage = document.createElement('img');
    fullImage.src = image.src;
    
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('image-modal__close');
    closeBtn.innerHTML = '&times;';
    
    modalContent.appendChild(fullImage);
    modalContent.appendChild(closeBtn);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Предотвращаем прокрутку страницы
    document.body.style.overflow = 'hidden';
    
    // Закрытие модального окна
    const closeModal = () => {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Закрытие по клавише Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  });
});

// Добавляем стили для модального окна
const addModalStyles = () => {
  if (!document.querySelector('#modal-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'modal-styles';
    styleSheet.textContent = `
      .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1100;
      }
      
      .image-modal__content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
      }
      
      .image-modal__content img {
        max-width: 100%;
        max-height: 90vh;
        display: block;
        margin: 0 auto;
      }
      
      .image-modal__close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 30px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
      }
    `;
    document.head.appendChild(styleSheet);
  }
};

document.addEventListener('DOMContentLoaded', addModalStyles);

// Анимация появления элементов при прокрутке с использованием Intersection Observer
const setupScrollAnimation = () => {
  // Optimize animation performance
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          entry.target.classList.add('animated');
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  // Добавляем класс для анимации
  document.querySelectorAll('.home__service, .portfolio__item, .team__member, .section-title, .home__title, .home__subtitle')
    .forEach(el => el.classList.add('animate-on-scroll'));
  
  setupScrollAnimation();
});

// Валидация формы перед отправкой
if (contactForm) {
  const validateForm = () => {
    let isValid = true;
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
      
      // Валидация email
      if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          isValid = false;
          input.classList.add('error');
        }
      }
    });
    
    return isValid;
  };
  
  contactForm.addEventListener('submit', (e) => {
    if (!validateForm()) {
      e.preventDefault();
      alert('Пожалуйста, заполните все обязательные поля корректно.');
    }
  });
  
  // Удаляем класс ошибки при вводе
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
    });
  });
}

// В начало файла добавим:
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован:', registration.scope);
      })
      .catch(error => {
        console.log('Ошибка регистрации ServiceWorker:', error);
      });
  });
}