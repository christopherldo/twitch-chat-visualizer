import { Reveal } from '../../components/Reveal';
import { StudioPanel } from '../../components/StudioPanel';

export function StudioSection() {
  return (
    <Reveal as="section" className="block">
      <StudioPanel variant="landing" />
    </Reveal>
  );
}
