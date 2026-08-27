import Image from "next/image";
import Link from "next/link";
import { Star, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatIDR } from "@/lib/utils";
import { TourPackage } from "@/types";

export function TourCard({ tour }: { tour: TourPackage }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow h-full">
      <Link href={`/tour/${tour.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={tour.coverImage}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge variant="solid" className="absolute top-3 left-3">
          {tour.categoryLabel}
        </Badge>
        {tour.originalPrice && (
          <Badge variant="default" className="absolute top-3 right-3 bg-white text-[color:var(--color-amber-deep)]">
            Hemat {Math.round((1 - tour.price / tour.originalPrice) * 100)}%
          </Badge>
        )}
      </Link>
      <CardContent className="pt-5 flex-1">
        <div className="flex items-center gap-1 text-xs text-black/50 mb-2">
          <MapPin className="h-3.5 w-3.5" />
          {tour.location}
          <span className="mx-1">·</span>
          <Clock className="h-3.5 w-3.5" />
          {tour.duration}
        </div>
        <Link href={`/tour/${tour.slug}`}>
          <h3 className="font-serif text-lg leading-snug mb-2 hover:text-[color:var(--color-amber-deep)] transition-colors">
            {tour.title}
          </h3>
        </Link>
        <p className="text-sm text-black/60 leading-relaxed line-clamp-2">
          {tour.shortDescription}
        </p>
        <div className="flex items-center gap-1 mt-3 text-sm">
          <Star className="h-4 w-4 fill-[color:var(--color-amber)] text-[color:var(--color-amber)]" />
          <span className="font-semibold">{tour.rating}</span>
          <span className="text-black/50">({tour.reviewCount} ulasan)</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-black/5 pt-4">
        <div>
          {tour.originalPrice && (
            <p className="text-xs text-black/40 line-through">
              {formatIDR(tour.originalPrice)}
            </p>
          )}
          <p className="font-serif text-lg text-[color:var(--color-amber-deep)]">
            {formatIDR(tour.price)}
            <span className="text-xs font-sans text-black/50"> /orang</span>
          </p>
        </div>
        <Button asChild size="sm">
          <Link href={`/tour/${tour.slug}`}>Detail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
