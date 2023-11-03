'use client';
import Image from 'next/image';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { send } from './actions';
export default function Home() {
  const [errors, setErrors] = React.useState<string[]>([]);
  return (
    <main className="flex min-h-screen flex-row items-center justify-center gap-8 p-8">
      {errors.length > 0 && (
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Błędy w formularzu</CardTitle>
            <CardDescription>
              Błędy w danych które zostały wprowadzone
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol>
              {errors.map((error) => (
                <li className="text-red-500 list-disc mx-4" key={error}>
                  {error}
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      )}

      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>Napisz recenzje</CardTitle>
          <CardDescription>
            Napisz recenzje filmu który nie dawno oglądałeś
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData: FormData) => {
              console.log('sending');
              let result = await send(formData);

              console.log(result);
              if (result.ok) {
                alert('Dodano recenzje');
                setErrors([]);
                document.querySelector('form')?.reset();
              } else {
                alert('Nie udało się dodać recenzji');
                setErrors(result.errors || []);
              }
            }}
          >
            <div className="grid w-full items-center gap-4">
              <Label htmlFor="name">Imię i Nazwisko</Label>
              <Input name="name" id="name" placeholder="Imie i Nazwisko" />
              <Label htmlFor="email">E-Mail</Label>
              <Input id="email" name="email" placeholder="E-Mail" />

              <Label htmlFor="movie">Film</Label>
              <Select name="movie">
                <SelectTrigger id="movie">
                  <SelectValue placeholder="Wybierz film" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="it-part1">IT - Part 1</SelectItem>
                  <SelectItem value="it-part2">IT - Part 2</SelectItem>
                  <SelectItem value="avengers">Avengers</SelectItem>
                  <SelectItem value="avengers2">
                    Avengers: Age of Ultron
                  </SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="rating">Ocena</Label>
              <Select name="rating">
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Wybierz ocene" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>

              <Textarea name="review" placeholder="Tu napisz swoją recenzje" />
              <Button type="submit">Dodaj</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </main>
  );
}
