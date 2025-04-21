import { dummyPosts } from "@/lib/dummy"
import Card from "../Card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  


function SubBanner() {
  return (
    
    <div className="overflow-hidden">
       <Carousel className="max-w-2xl">
            <CarouselContent>
                {dummyPosts.map( (post) => (
                    <CarouselItem key={post.id} className="sm:basis-1/1 md:basis-1/2">
                        <Card  post={post}/>
                    </CarouselItem>
                ))}
            </CarouselContent>

       </Carousel>

    </div>
       
        
    
  )
}

export default SubBanner