import Navbar from '@/components/Navbar';
import {
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { ShieldCheck, Zap, Cloud } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <Container maxWidth="lg" className="pt-20 pb-16">
        <section className="text-center mb-20">
          <Typography
            variant="h2"
            component="h1"
            className="font-extrabold text-gray-900 mb-6"
          >
            Suas ideias, organizadas <br />
            <span className="text-blue-600">em qualquer lugar.</span>
          </Typography>
          <Typography
            variant="h6"
            className="text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Um sistema de notas leve e potente. Desenvolvido para quem busca
            produtividade sem distrações, com sincronização em tempo real e
            segurança de ponta.
          </Typography>
          <div className="flex justify-center gap-4">
            <Link href="/signup" passHref>
              <Button
                variant="contained"
                size="large"
                className="px-8 py-3 bg-blue-600 text-lg normal-case"
              >
                Começar agora - É Grátis
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <Grid container spacing={4}>
          <FeatureCard
            icon={<Zap className="text-yellow-500" />}
            title="Performance Extrema"
            description="Interface instantânea alimentada por React Query v5 para uma experiência sem carregamentos."
          />
          <FeatureCard
            icon={<ShieldCheck className="text-green-500" />}
            title="Privacidade Total"
            description="Suas notas são protegidas por Row Level Security (RLS) diretamente no banco de dados."
          />
          <FeatureCard
            icon={<Cloud className="text-blue-500" />}
            title="Nuvem Híbrida"
            description="Acesse suas informações de qualquer dispositivo com persistência garantida via Supabase."
          />
        </Grid>
      </Container>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card
        variant="outlined"
        className="h-full hover:border-blue-300 transition-colors duration-300"
      >
        <CardContent className="p-8">
          <div className="mb-4 bg-gray-100 w-fit p-3 rounded-lg">{icon}</div>
          <Typography variant="h5" component="h3" className="font-bold mb-3">
            {title}
          </Typography>
          <Typography variant="body1" className="text-gray-500 leading-relaxed">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
