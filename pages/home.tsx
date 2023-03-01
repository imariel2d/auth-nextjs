import { useEffect, useState } from 'react';

import { Pet } from '@/data/pets';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    fetch('/api/pets', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status === 401) {
          router.push('/');
        }
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          setPets(res);
        }
      })
      .catch(error => console.log(error));
  }, [router]);

  return (
    <div>
      <h1>You only see the pet list if you are logged in!</h1>
      <ul>
        {
          pets.map((pet) => (
            <li key={pet.name}>{pet.name}</li>
          ))
        }
      </ul>
    </div>
  );
}
