import { useStore } from '@builder.io/mitosis';

export type CarouselProps = {};

export default function Carousel(props: CarouselProps) {
  const state = useStore({
    activeSlide: 0,
    nextSlide() {
      state.activeSlide = state.activeSlide + 1;
    },
    prevSlide() {
      state.activeSlide = state.activeSlide - 1;
    },
    onScroll(event: UIEvent) {},
  });

  return (
    <div
      onScroll={(event) => state.onScroll(event)}
      css={{
        overflow: 'auto',
        scrollSnapType: 'x mandatory',
        scrollSnapAlign: 'center',
      }}
    >
      <button
        onClick={() => {
          state.prevSlide();
        }}
      >
        Prev Slide
      </button>
      {/* TODO: stuff inside */}
      <button
        onClick={() => {
          state.nextSlide();
        }}
      >
        Next Slide
      </button>
    </div>
  );
}
