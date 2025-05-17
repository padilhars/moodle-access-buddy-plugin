
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">a11y4mdl - Plugin de Acessibilidade</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Exemplo de interface minimalista para um plugin de acessibilidade para o Moodle. Use o botão flutuante no canto inferior direito para acessar as opções de acessibilidade.
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Contraste e Saturação</CardTitle>
            <CardDescription>Ajuste o contraste e a saturação da página para melhorar a visibilidade.</CardDescription>
          </CardHeader>
          <CardContent>
            <img 
              src="https://placehold.co/300x200" 
              alt="Exemplo de imagem para testar ajustes de contraste" 
              className="rounded-md w-full"
            />
            <p className="mt-4">
              A opção de contraste permite escolher entre modos como alto contraste, baixo contraste, modo escuro e sépia.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => toast({ title: "Recurso ativado", description: "Experimente diferentes configurações de contraste." })}>
              Saiba mais
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ferramentas de Leitura</CardTitle>
            <CardDescription>Facilite a leitura com guias e máscaras de leitura.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              As ferramentas de leitura ajudam usuários a concentrar sua atenção no texto. O guia de leitura mostra uma linha horizontal que segue o cursor, enquanto a máscara de leitura escurece tudo exceto uma área ao redor do cursor.
            </p>
            <p className="mt-2">
              Estas ferramentas são particularmente úteis para pessoas com dislexia ou dificuldades de concentração durante a leitura.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => toast({ title: "Guia de leitura", description: "Move uma linha horizontal junto com seu cursor." })}>
              Testar Guia
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aparência do Texto</CardTitle>
            <CardDescription>Personalize o texto para melhorar a legibilidade.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Ajuste o tamanho da fonte, espaçamento entre letras e linhas para melhorar a experiência de leitura.
              </p>
              <p>
                A fonte OpenDyslexic é especialmente projetada para ajudar pessoas com dislexia a ler com mais facilidade.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setCount(count + 1)} className="w-full">
              Contador: {count}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Navegação Assistida</CardTitle>
            <CardDescription>Facilite a navegação e interação com elementos da página.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Os recursos de navegação incluem destaque para links e botões, navegação por teclado e cursores ampliados.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#" className="text-blue-600 hover:underline">Link de exemplo 1</a>
              <a href="#" className="text-blue-600 hover:underline">Link de exemplo 2</a>
              <a href="#" className="text-blue-600 hover:underline">Link de exemplo 3</a>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Botão 1</Button>
            <Button variant="outline">Botão 2</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Visual</CardTitle>
            <CardDescription>Ajuste o conteúdo visual para suas necessidades.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              src="https://placehold.co/300x200/2ecc71/ffffff?text=Imagem+de+Exemplo"
              alt="Segunda imagem de exemplo"
              className="rounded-md w-full"
            />
            <div className="flex items-center justify-center h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md animate-pulse">
              <p className="text-white font-bold">Animação de exemplo</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full">
              Ocultar Visuais
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acessibilidade Completa</CardTitle>
            <CardDescription>Atendendo aos padrões WCAG 2.1.</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">Recursos disponíveis:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contraste ajustável</li>
              <li>Tamanho de fonte personalizável</li>
              <li>Espaçamento de texto</li>
              <li>Guia de leitura</li>
              <li>Destaque para elementos interativos</li>
              <li>Cursores ampliados</li>
              <li>Compatibilidade com leitores de tela</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full">
              Explorar Todos os Recursos
            </Button>
          </CardFooter>
        </Card>
      </main>

      <footer className="mt-12 text-center text-gray-500 pb-4">
        <p>© 2025 a11y4mdl - Plugin de Acessibilidade para Moodle</p>
      </footer>
    </div>
  );
};

export default Index;
