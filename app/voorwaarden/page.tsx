import Link from "next/link"
import { SITE } from "@/lib/constants"

export const metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Future Content: voor de AI-quickscan, werksessies, AI-bouwprojecten, beheer, videoproductie en trainingen.",
  alternates: { canonical: "/voorwaarden" },
}

const VERSIE = "1.0"
const DATUM = "2 juli 2026"

export default function VoorwaardenPagina() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <span className="inline-block text-[#B45F38] text-xs font-semibold uppercase tracking-widest mb-4">
        Juridisch
      </span>
      <h1
        className="text-3xl md:text-4xl"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 600,
          color: "#2A2218",
        }}
      >
        Algemene voorwaarden
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[#2A2218]">
        Dit zijn de algemene voorwaarden van Future Content, de eenmanszaak van
        John Lavrijsen in Bladel. Ze gelden voor alle diensten die op deze
        site staan: de gratis AI-quickscan, de betaalde werksessie, AI-bouwprojecten
        op maat, doorlopend beheer, videoproductie en trainingen. Geschreven
        in leesbaar Nederlands, maar juridisch bedoeld om stand te houden.
      </p>

      {/* Go-live audit 2 juli: het interne "[INVULLEN: John]"-blok stond hier
          zichtbaar voor bezoekers en is verwijderd. De actie zelf blijft
          staan (zie GO-LIVE-CHECK.md): laat deze voorwaarden één keer door
          een jurist checken. */}

      <Artikel nr="1" titel="Definities">
        <p>In deze voorwaarden wordt verstaan onder:</p>
        <Lijst
          items={[
            <>
              <strong>Future Content:</strong> de eenmanszaak van John
              Lavrijsen, gevestigd in Bladel, KvK-nummer {SITE.kvk}.
            </>,
            <>
              <strong>Opdrachtgever:</strong> de onderneming of organisatie die
              een dienst afneemt van Future Content.
            </>,
            <>
              <strong>Diensten:</strong> alle werkzaamheden die Future Content
              voor Opdrachtgever verricht, waaronder de AI-quickscan en
              uitgebreide scan, de werksessie/discovery, AI-bouwprojecten op
              maat, doorlopend beheer en onderhoud, videoproductie, en
              trainingen en workshops.
            </>,
            <>
              <strong>Overeenkomst:</strong> elke afspraak tussen Future
              Content en Opdrachtgever over het leveren van Diensten, ongeacht
              of die schriftelijk, per e-mail of via een geaccepteerde
              offerte tot stand komt.
            </>,
            <>
              <strong>Output:</strong> alles wat met behulp van AI wordt
              gegenereerd binnen een Dienst, waaronder scanrapporten,
              teksten, code, workflows en analyses.
            </>,
            <>
              <strong>Schriftelijk:</strong> inclusief communicatie per
              e-mail, mits de inhoud en herkomst voldoende vaststaan.
            </>,
          ]}
        />
      </Artikel>

      <Artikel nr="2" titel="Toepasselijkheid">
        <p>
          2.1 Deze voorwaarden zijn van toepassing op elke offerte en
          Overeenkomst tussen Future Content en Opdrachtgever, voor zover
          niet uitdrukkelijk en schriftelijk anders is overeengekomen.
        </p>
        <p className="mt-3">
          2.2 Deze voorwaarden gelden uitsluitend voor de zakelijke markt
          (B2B). Opdrachtgever handelt bij het aangaan van de Overeenkomst
          in de uitoefening van een beroep of bedrijf.
        </p>
        <p className="mt-3">
          2.3 Eigen inkoop-, algemene of andere voorwaarden van Opdrachtgever
          worden uitdrukkelijk van de hand gewezen, tenzij Future Content
          deze schriftelijk en uitdrukkelijk heeft aanvaard.
        </p>
        <p className="mt-3">
          2.4 Afwijkingen van deze voorwaarden zijn alleen geldig als ze
          schriftelijk tussen partijen zijn overeengekomen.
        </p>
      </Artikel>

      <Artikel nr="3" titel="Offertes en totstandkoming van de overeenkomst">
        <p>
          3.1 Alle offertes van Future Content zijn vrijblijvend en 30
          dagen geldig, tenzij in de offerte een andere termijn staat.
        </p>
        <p className="mt-3">
          3.2 Een Overeenkomst komt tot stand op het moment dat Opdrachtgever
          een offerte schriftelijk accepteert, of zodra Future Content op
          verzoek van Opdrachtgever met de uitvoering van de Dienst begint.
        </p>
        <p className="mt-3">
          3.3 De gratis AI-quickscan valt niet onder deze bepaling: die kan
          zonder offerte of acceptatie worden aangevraagd en gebruikt. Artikel
          5 (AI-specifieke bepaling) is daar onverkort op van toepassing.
        </p>
        <p className="mt-3">
          3.4 Wijzigingen of aanvullingen op een geaccepteerde offerte gelden
          pas als Future Content deze schriftelijk heeft bevestigd, en
          kunnen gevolgen hebben voor prijs en planning.
        </p>
      </Artikel>

      <Artikel nr="4" titel="Uitvoering van de overeenkomst">
        <p>
          4.1 Future Content voert de Diensten uit naar beste inzicht en
          vermogen, op basis van een inspanningsverplichting. Tenzij
          uitdrukkelijk schriftelijk anders overeengekomen, garandeert
          Future Content geen specifiek resultaat.
        </p>
        <p className="mt-3">
          4.2 Voor werksessies, AI-bouwprojecten en trainingen geldt in het
          bijzonder: het uiteindelijke effect (bijvoorbeeld tijdsbesparing,
          omzetgroei of adoptie binnen het team van Opdrachtgever) hangt mede
          af van keuzes en medewerking van Opdrachtgever, en is nadrukkelijk
          geen resultaatsverplichting van Future Content.
        </p>
        <p className="mt-3">
          4.3 Opdrachtgever levert tijdig de informatie, toegang en
          medewerking die redelijkerwijs nodig is om de Dienst te kunnen
          uitvoeren. Vertraging die daardoor ontstaat, komt niet voor
          rekening van Future Content.
        </p>
        <p className="mt-3">
          4.4 Genoemde levertermijnen zijn indicatief, tenzij uitdrukkelijk
          schriftelijk een fatale termijn is afgesproken.
        </p>
      </Artikel>

      <Artikel nr="5" titel="AI-specifieke bepaling">
        <p>
          5.1 Een deel van de Diensten van Future Content maakt gebruik van
          AI (kunstmatige intelligentie), waaronder de AI-quickscan, de
          uitgebreide scan en onderdelen van AI-bouwprojecten. Opdrachtgever
          erkent en aanvaardt dat AI-gegenereerde Output:
        </p>
        <Lijst
          items={[
            "gebaseerd is op patronen en publiek beschikbare of aangeleverde informatie, en niet op menselijke verificatie van elk detail;",
            "onjuistheden, verouderde informatie of onvolledigheden kan bevatten;",
            "indicatief van aard is en niet moet worden opgevat als een garantie, professioneel advies (juridisch, financieel, fiscaal of anderszins) of eindoordeel;",
            "altijd door Opdrachtgever zelf gecontroleerd en beoordeeld dient te worden voordat er beslissingen op worden gebaseerd of de Output extern wordt gebruikt.",
          ]}
        />
        <p className="mt-3">
          5.2 Opdrachtgever blijft te allen tijde zelf verantwoordelijk voor
          beslissingen die worden genomen op basis van AI-gegenereerde
          Output, en voor controle van die Output vóór gebruik richting
          klanten, medewerkers of derden.
        </p>
        <p className="mt-3">
          5.3 Deze bepaling sluit aan bij en vult de disclaimer aan die
          binnen de scan-omgeving van Future Content wordt getoond (zie{" "}
          <Link href="/scan" className="underline underline-offset-4">
            de scan
          </Link>
          ): "Dit rapport en deze analyse zijn met AI gegenereerd op basis
          van openbaar beschikbare informatie. De inhoud is indicatief en kan
          onjuistheden bevatten. Aan de uitkomsten kunnen geen rechten worden
          ontleend."
        </p>
        <p className="mt-3">
          5.4 Future Content aanvaardt geen aansprakelijkheid voor schade of
          beslissingen die voortvloeien uit het gebruik van AI-gegenereerde
          Output, behoudens het bepaalde in artikel 11 (aansprakelijkheid).
        </p>
      </Artikel>

      <Artikel nr="6" titel="Prijzen en betaling">
        <p>
          6.1 Alle prijzen die Future Content noemt zijn exclusief btw,
          tenzij uitdrukkelijk anders vermeld.
        </p>
        <p className="mt-3">
          6.2 Voor werksessies geldt het tarief zoals vermeld op de
          website of in de offerte op het moment van boeken. Voor
          AI-bouwprojecten geldt het bedrag zoals vastgelegd in de
          geaccepteerde offerte. Voor doorlopend beheer en onderhoud geldt
          een vast maandbedrag zoals overeengekomen bij aanvang.
        </p>
        <p className="mt-3">
          6.3 Facturen dienen binnen 14 dagen na factuurdatum te zijn
          voldaan, tenzij schriftelijk een andere termijn is overeengekomen.
        </p>
        <p className="mt-3">
          6.4 Bij overschrijding van de betaaltermijn is Opdrachtgever van
          rechtswege in verzuim en is de wettelijke handelsrente
          verschuldigd over het openstaande bedrag, onverminderd het recht
          van Future Content om buitengerechtelijke incassokosten in
          rekening te brengen conform de wettelijke staffel.
        </p>
        <p className="mt-3">
          6.5 Future Content mag bij AI-bouwprojecten werken met
          termijnfacturen (bijvoorbeeld bij start, bij oplevering van een
          tussenversie, en bij afronding), zoals opgenomen in de offerte.
        </p>
        <p className="mt-3">
          6.6 Bij een AI-bouwproject dat mede via de SLIM-subsidie of een
          vergelijkbare regeling wordt gefinancierd, blijft Opdrachtgever
          zelf verantwoordelijk voor de subsidieaanvraag en toekenning.
          Future Content levert desgevraagd het benodigde
          scholingsplan-document, maar garandeert geen toekenning van
          subsidie.
        </p>
      </Artikel>

      <Artikel nr="7" titel="Intellectueel eigendom">
        <p>
          7.1 <strong>Maatwerk-code en -systemen.</strong> Bij AI-bouwprojecten
          en doorlopend beheer krijgt Opdrachtgever, na volledige betaling,
          een gebruiksrecht op de specifiek voor Opdrachtgever gebouwde
          code, workflows en configuraties, zodat Opdrachtgever het
          resultaat kan gebruiken en desgewenst laten overdragen of door een
          andere partij laten beheren.
        </p>
        <p className="mt-3">
          7.2 <strong>Generieke bouwstenen.</strong> Onderliggende generieke
          bouwstenen, modules, tools, templates en het modulaire platform
          van Future Content (waaronder de acht core-modules en
          branche-skins) blijven eigendom van Future Content, ook als ze
          zijn gebruikt bij het bouwen van een oplossing voor Opdrachtgever.
          Opdrachtgever krijgt hierop een niet-exclusief gebruiksrecht,
          beperkt tot het gebruik binnen de eigen onderneming, zolang de
          Overeenkomst (bij doorlopend beheer) loopt of zoals anders
          schriftelijk overeengekomen.
        </p>
        <p className="mt-3">
          7.3 <strong>Videomateriaal.</strong> Bij videoproductie (vastgoedvideo's,
          social-content, bedrijfsvideo's, trouwvideo's, aftermovies) blijft
          het auteursrecht op de opnamen bij Future Content, tenzij
          schriftelijk anders overeengekomen. Opdrachtgever krijgt na
          volledige betaling een gebruiksrecht op het opgeleverde
          eindmateriaal voor het overeengekomen doel (bijvoorbeeld Funda,
          eigen website, social media). Ruw materiaal en niet-opgeleverde
          versies vallen niet onder dit gebruiksrecht.
        </p>
        <p className="mt-3">
          7.4 Future Content mag opgeleverd werk (met uitzondering van
          vertrouwelijke bedrijfsinformatie, zie artikel 8) gebruiken in het
          eigen portfolio en op de eigen website en social kanalen, tenzij
          Opdrachtgever schriftelijk aangeeft dit niet te willen.
        </p>
      </Artikel>

      <Artikel nr="8" titel="Geheimhouding">
        <p>
          8.1 Beide partijen houden alle vertrouwelijke informatie geheim
          die zij van elkaar ontvangen in het kader van de Overeenkomst,
          waaronder bedrijfsprocessen, klantgegevens, financiële informatie
          en de inhoud van het "tweede brein" dat voor Opdrachtgever wordt
          opgebouwd.
        </p>
        <p className="mt-3">
          8.2 Deze verplichting geldt niet voor informatie die al openbaar
          was, die Future Content al kende, of die verplicht moet worden
          verstrekt op grond van wet- of regelgeving of een rechterlijk
          bevel.
        </p>
        <p className="mt-3">
          8.3 De geheimhoudingsplicht blijft ook na afloop of beëindiging
          van de Overeenkomst van kracht.
        </p>
      </Artikel>

      <Artikel nr="9" titel="Verwerking van persoonsgegevens">
        <p>
          9.1 Voor zover Future Content bij de uitvoering van de Diensten
          persoonsgegevens verwerkt (bijvoorbeeld bij de AI-quickscan, het
          contactformulier of een AI-bouwproject dat klantdata van
          Opdrachtgever verwerkt), gebeurt dit conform de Algemene
          Verordening Gegevensbescherming (AVG).
        </p>
        <p className="mt-3">
          9.2 Hoe Future Content omgaat met persoonsgegevens staat beschreven
          in de{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            privacyverklaring
          </Link>
          . Die verklaring maakt onderdeel uit van deze voorwaarden.
        </p>
        <p className="mt-3">
          9.3 Voor zover Future Content bij een AI-bouwproject of
          doorlopend beheer optreedt als verwerker van persoonsgegevens
          namens Opdrachtgever (verwerkingsverantwoordelijke), sluiten
          partijen desgewenst een aparte verwerkersovereenkomst af{" "}
          <em>[INVULLEN: template verwerkersovereenkomst nog opstellen/koppelen
          zodra dit voor een concrete klant relevant wordt]</em>.
        </p>
      </Artikel>

      <Artikel nr="10" titel="Overmacht">
        <p>
          10.1 Geen van beide partijen is gehouden tot nakoming van een
          verplichting als dat onmogelijk is door overmacht. Onder overmacht
          wordt in ieder geval verstaan: ziekte of uitval van Future
          Content zonder tijdige vervanging, storingen bij AI-providers of
          andere onderliggende diensten (bijvoorbeeld Anthropic, hosting- of
          betaaldienstverleners), stroom- of internetstoringen, en andere
          omstandigheden die redelijkerwijs buiten de invloedssfeer van
          partijen liggen.
        </p>
        <p className="mt-3">
          10.2 Bij overmacht die langer dan 30 dagen duurt, mag ieder van de
          partijen de Overeenkomst schriftelijk ontbinden voor het nog niet
          uitgevoerde deel, zonder dat dit recht geeft op
          schadevergoeding.
        </p>
      </Artikel>

      <Artikel nr="11" titel="Aansprakelijkheid">
        <p>
          11.1 De totale aansprakelijkheid van Future Content voor schade
          die voortvloeit uit of verband houdt met de uitvoering van een
          Overeenkomst is beperkt tot de factuurwaarde van de betreffende
          opdracht (bij doorlopende diensten: de vergoeding over de laatste
          drie maanden), met een absoluut maximum van{" "}
          <strong>€10.000 per gebeurtenis</strong>, met een maximum van{" "}
          <strong>€25.000 per kalenderjaar</strong>
          {" "}
          <em>[INVULLEN: John, controleer of deze bedragen passen bij je
          beroepsaansprakelijkheidsverzekering, voor zover je die hebt
          afgesloten, en stem het maximum daarop af]</em>.
        </p>
        <p className="mt-3">
          11.2 Future Content is nooit aansprakelijk voor indirecte schade,
          waaronder gevolgschade, gederfde winst, gemiste besparingen,
          reputatieschade en schade door bedrijfsstagnatie.
        </p>
        <p className="mt-3">
          11.3 De beperkingen in dit artikel gelden niet voor zover schade
          het gevolg is van opzet of bewuste roekeloosheid van Future
          Content.
        </p>
        <p className="mt-3">
          11.4 Opdrachtgever vrijwaart Future Content voor aanspraken van
          derden die verband houden met het gebruik dat Opdrachtgever maakt
          van geleverde Diensten of Output, tenzij dat gebruik het directe
          gevolg is van opzet of bewuste roekeloosheid van Future Content.
        </p>
        <p className="mt-3">
          11.5 Een vordering tot schadevergoeding vervalt als deze niet
          binnen 12 maanden nadat Opdrachtgever bekend werd of redelijkerwijs
          bekend had kunnen zijn met de schade, schriftelijk bij Future
          Content is gemeld.
        </p>
      </Artikel>

      <Artikel nr="12" titel="Duur en beëindiging van doorlopende diensten">
        <p>
          12.1 Overeenkomsten voor doorlopend beheer en onderhoud worden
          aangegaan voor onbepaalde tijd en zijn maandelijks opzegbaar,
          tenzij partijen schriftelijk een minimumtermijn zijn
          overeengekomen.
        </p>
        <p className="mt-3">
          12.2 Opzeggen gebeurt schriftelijk, met inachtneming van een
          opzegtermijn van één kalendermaand, tenzij anders overeengekomen.
        </p>
        <p className="mt-3">
          12.3 Bij beëindiging van doorlopend beheer levert Future Content
          binnen redelijke termijn de gegevens, toegang en documentatie op
          die nodig zijn om het beheer over te dragen aan Opdrachtgever of
          een derde partij, conform het uitgangspunt uit artikel 7.1 dat
          Opdrachtgever eigenaar blijft van het eigen proces.
        </p>
        <p className="mt-3">
          12.4 Future Content mag de Overeenkomst met onmiddellijke ingang
          schriftelijk opzeggen of ontbinden als Opdrachtgever ondanks
          schriftelijke aanmaning in verzuim blijft met betaling, of in
          geval van faillissement, surseance van betaling of
          bedrijfsbeëindiging van Opdrachtgever.
        </p>
      </Artikel>

      <Artikel nr="13" titel="Toepasselijk recht en bevoegde rechter">
        <p>13.1 Op alle Overeenkomsten en deze voorwaarden is Nederlands recht van toepassing.</p>
        <p className="mt-3">
          13.2 Geschillen worden bij uitsluiting voorgelegd aan de bevoegde
          rechter van de Rechtbank Oost-Brabant, tenzij dwingend recht een
          andere rechter aanwijst.
        </p>
      </Artikel>

      <Artikel nr="14" titel="Slotbepalingen">
        <p>
          14.1 Mocht een bepaling uit deze voorwaarden nietig of
          vernietigbaar blijken, dan blijven de overige bepalingen volledig
          van kracht en vervangen partijen de betreffende bepaling door een
          bepaling die de bedoeling van de oorspronkelijke bepaling zo dicht
          mogelijk benadert.
        </p>
        <p className="mt-3">
          14.2 Future Content mag deze voorwaarden wijzigen. De meest actuele
          versie staat op deze pagina en geldt voor nieuwe Overeenkomsten
          vanaf de datum onderaan.
        </p>
      </Artikel>

      <div className="mt-16 pt-8 border-t" style={{ borderColor: "#E4D8C6" }}>
        <p className="text-sm" style={{ color: "#6E6151" }}>
          Versie {VERSIE} · {DATUM}
        </p>
        <p className="mt-2 text-sm" style={{ color: "#6E6151" }}>
          Vragen over deze voorwaarden? Mail naar{" "}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
            {SITE.email}
          </a>
          . Zie ook de{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            privacyverklaring
          </Link>
          .
        </p>
      </div>
    </main>
  )
}

function Artikel({
  nr,
  titel,
  children,
}: {
  nr: string
  titel: string
  children: React.ReactNode
}) {
  return (
    <section className="mt-10">
      <h2
        className="text-xl md:text-2xl"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 600,
          color: "#2A2218",
        }}
      >
        {nr}. {titel}
      </h2>
      <div className="mt-3 text-base leading-relaxed" style={{ color: "#2A2218" }}>
        {children}
      </div>
    </section>
  )
}

function Lijst({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc pl-5 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}
