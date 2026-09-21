import Link from "next/link"
import { SITE } from "@/lib/constants"

// GEGENEREERD door 00-future-content/juridisch/bouw-voorwaarden.py uit
// 00-future-content/juridisch/algemene-voorwaarden.md. Niet met de hand
// aanpassen: wijzig de bron en draai het script, dan blijven site, PDF en
// OS-akkoordpagina gelijk.

export const metadata = {
  title: "Algemene voorwaarden",
  description:
    "De algemene voorwaarden van Future Content: voor de AI-quickscan, werksessies, AI-bouwprojecten, beheer, videoproductie en trainingen.",
  alternates: { canonical: "/voorwaarden" },
}

const VERSIE = "2.0"
const DATUM = "21 september 2026"

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
        Algemene voorwaarden Future Content
      </h1>
      <p className="mt-6 text-base leading-relaxed text-[#2A2218]">Future Content is de eenmanszaak van John Lavrijsen, Prins Clausstraat 12, 5531 JH Bladel, KvK 86880675. Hieronder "Future Content". De partij die een dienst afneemt heet "opdrachtgever". Deze voorwaarden zijn geschreven in leesbaar Nederlands en bedoeld om stand te houden.</p>

      <Artikel nr="1" titel="Begrippen">
        <Lijst
          items={[
            <><strong>Diensten:</strong> alles wat Future Content voor opdrachtgever doet. Daaronder vallen de AI-quickscan en de uitgebreide scan, werksessies, AI-bouwprojecten op maat, beheer en onderhoud, trainingen en workshops, en videoproductie.</>,
            <><strong>Overeenkomst:</strong> elke afspraak tussen Future Content en opdrachtgever over diensten, ook als die per e-mail of via de akkoord-pagina tot stand komt.</>,
            <><strong>Output:</strong> alles wat binnen een dienst met AI wordt gemaakt, zoals scanrapporten, teksten, code, workflows en analyses.</>,
            <><strong>Maatwerk:</strong> code, workflows en configuraties die specifiek voor opdrachtgever zijn gebouwd.</>,
            <><strong>Schriftelijk:</strong> ook per e-mail, zolang inhoud en afzender voldoende vaststaan.</>
          ]}
        />
      </Artikel>

      <Artikel nr="2" titel="Waar deze voorwaarden gelden">
        <p>2.1 Deze voorwaarden gelden op alle offertes, overeenkomsten en werkzaamheden van Future Content.</p>
        <p className="mt-3">2.2 Future Content werkt voor bedrijven en organisaties. Opdrachtgever handelt bij het aangaan van de overeenkomst in de uitoefening van een beroep of bedrijf. Voor particulieren gelden deze voorwaarden niet. Daarvoor maakt Future Content per opdracht aparte, schriftelijke afspraken.</p>
        <p className="mt-3">2.3 Eigen inkoop- of andere voorwaarden van opdrachtgever gelden niet, tenzij Future Content die schriftelijk heeft aanvaard.</p>
        <p className="mt-3">2.4 Afwijkingen van deze voorwaarden gelden alleen als ze schriftelijk zijn afgesproken.</p>
      </Artikel>

      <Artikel nr="3" titel="Offerte en akkoord">
        <p>3.1 Een offerte is 30 dagen geldig, tenzij er een andere termijn in staat.</p>
        <p className="mt-3">3.2 De overeenkomst ontstaat zodra opdrachtgever de offerte schriftelijk accepteert, of zodra Future Content op verzoek van opdrachtgever met het werk begint. Akkoord geven kan via de online akkoord-pagina van Future Content, per e-mail of met een handtekening. Die drie zijn gelijkwaardig. Na akkoord via de akkoord-pagina ontvangt opdrachtgever een bevestiging met de offerte en deze voorwaarden als PDF.</p>
        <p className="mt-3">3.3 De gratis AI-quickscan kan zonder offerte worden aangevraagd en gebruikt. Artikel 5 geldt daar volledig op.</p>
        <p className="mt-3">3.4 Wijzigingen op een geaccepteerde offerte gelden zodra Future Content ze schriftelijk heeft bevestigd. Ze kunnen gevolgen hebben voor prijs en planning.</p>
      </Artikel>

      <Artikel nr="4" titel="Uitvoering en medewerking">
        <p>4.1 Future Content voert het werk vakkundig en zorgvuldig uit. Dat is een inspanningsverplichting. Future Content garandeert geen bepaald resultaat, tenzij dat schriftelijk is afgesproken.</p>
        <p className="mt-3">4.2 Het effect van een dienst, zoals tijdsbesparing, omzetgroei of adoptie binnen het team, hangt mede af van keuzes en medewerking van opdrachtgever. Besparingen of opbrengsten die in een scan, offerte of gesprek worden genoemd, zijn een inschatting en geen toezegging.</p>
        <p className="mt-3">4.3 Opdrachtgever zorgt op tijd voor de informatie, toegang en medewerking die nodig zijn, ook van zijn eigen IT-beheerder en andere leveranciers. Komt dat later, dan schuift de planning mee. Extra kosten die daardoor ontstaan komen niet voor rekening van Future Content.</p>
        <p className="mt-3">4.4 Levertermijnen zijn indicatief, tenzij schriftelijk een fatale termijn is afgesproken.</p>
        <p className="mt-3">4.5 Future Content mag diensten van derden inzetten, zoals hosting, AI-modellen en betaaldiensten. Future Content kiest die zorgvuldig, maar staat niet in voor hun beschikbaarheid. Voor die diensten gelden de voorwaarden van die derden.</p>
      </Artikel>

      <Artikel nr="5" titel="AI en Output">
        <p>5.1 Een deel van de diensten maakt gebruik van AI, waaronder de AI-quickscan, de uitgebreide scan en onderdelen van bouwprojecten. Output is gebaseerd op patronen en op aangeleverde of openbare informatie, niet op menselijke controle van elk detail. Output kan onjuist, verouderd of onvolledig zijn en is geen juridisch, financieel of fiscaal advies.</p>
        <p className="mt-3">5.2 Opdrachtgever controleert Output voordat hij er beslissingen op baseert of hem naar klanten, medewerkers of derden stuurt. Beslissingen op basis van Output blijven zijn eigen verantwoordelijkheid.</p>
        <p className="mt-3">5.3 Future Content staat er niet voor in dat Output vrij is van rechten van derden. Wil opdrachtgever Output publiek gebruiken, dan controleert hij dat zelf of vraagt hij Future Content om een aanvullende controle.</p>
        <p className="mt-3">5.4 De disclaimer die in de scan-omgeving wordt getoond maakt deel uit van deze voorwaarden: "Dit rapport en deze analyse zijn met AI gegenereerd op basis van openbaar beschikbare informatie. De inhoud is indicatief en kan onjuistheden bevatten. Aan de uitkomsten kunnen geen rechten worden ontleend."</p>
        <p className="mt-3">5.5 Voor schade door het gebruik van Output geldt artikel 14. Heeft opdrachtgever Output niet gecontroleerd zoals in 5.2 staat, dan blijft die schade voor zijn rekening.</p>
      </Artikel>

      <Artikel nr="6" titel="Oplevering en acceptatie">
        <p>6.1 Bij een bouwproject geldt na installatie of livegang een testperiode van vijf werkdagen. Daarin gebruikt opdrachtgever het systeem in de praktijk.</p>
        <p className="mt-3">6.2 Blokkerende fouten die binnen die periode schriftelijk worden gemeld, herstelt Future Content eerst. Daarna start de testperiode opnieuw.</p>
        <p className="mt-3">6.3 Wordt binnen de testperiode niets gemeld, of neemt opdrachtgever het systeem in gebruik voor zijn dagelijkse werk, dan geldt het werk als opgeleverd en geaccepteerd.</p>
        <p className="mt-3">6.4 Kleine gebreken die het gebruik niet blokkeren zijn geen reden om acceptatie te weigeren. Future Content lost ze binnen een redelijke termijn op.</p>
      </Artikel>

      <Artikel nr="7" titel="Beheer en service">
        <p>7.1 Als beheer is afgesproken, staat in de offerte wat daaronder valt. Groter werk krijgt altijd eerst een prijs op papier. Er volgt geen naheffing achteraf.</p>
        <p className="mt-3">7.2 Genoemde reactie- en oplostijden zijn streeftijden waar Future Content zich aan houdt. Het zijn geen garanties met een boete.</p>
        <p className="mt-3">7.3 Bij het einde van het beheer stopt de toegang tot online omgevingen van Future Content. Software die op de eigen server van opdrachtgever draait, blijft daar gewoon draaien.</p>
      </Artikel>

      <Artikel nr="8" titel="Prijzen en betaling">
        <p>8.1 Alle prijzen zijn exclusief btw, tenzij anders vermeld.</p>
        <p className="mt-3">8.2 Voor werksessies geldt het tarief op de website of in de offerte op het moment van boeken. Voor bouwprojecten geldt het bedrag in de geaccepteerde offerte, eventueel in termijnen (bijvoorbeeld bij start, bij een tussenversie en bij afronding). Voor beheer geldt een vast maandbedrag.</p>
        <p className="mt-3">8.3 De betaaltermijn is 14 dagen na factuurdatum, tenzij schriftelijk anders is afgesproken.</p>
        <p className="mt-3">8.4 Na het verstrijken van de betaaltermijn is opdrachtgever zonder aanmaning in verzuim. Dan is de wettelijke handelsrente verschuldigd en mag Future Content buitengerechtelijke incassokosten rekenen volgens de wettelijke staffel. Blijft betaling na een herinnering uit, dan mag Future Content het werk opschorten tot er betaald is.</p>
        <p className="mt-3">8.5 De beheerprijs staat de eerste 12 maanden vast en kan daarna één keer per jaar worden aangepast, met de CBS-dienstenprijsindex als richtlijn en een aankondiging van minimaal twee maanden vooraf. Kosten van derden die Future Content één op één doorbelast, zoals hosting of AI-verbruik, kunnen bij een prijswijziging van die derde ook tussentijds veranderen, met een aankondiging van minimaal een maand vooraf.</p>
        <p className="mt-3">8.6 Wordt een dienst mede uit een subsidie betaald, zoals de SLIM-regeling, dan blijft opdrachtgever zelf verantwoordelijk voor de aanvraag en de toekenning. Future Content levert desgevraagd het benodigde scholingsplan, maar garandeert geen toekenning.</p>
      </Artikel>

      <Artikel nr="9" titel="Duur en einde van doorlopende diensten">
        <p>9.1 Beheer wordt aangegaan voor onbepaalde tijd en is maandelijks opzegbaar, schriftelijk, met een opzegtermijn van één maand tegen het einde van een kalendermaand. Dit geldt niet als partijen schriftelijk een minimumtermijn zijn overeengekomen.</p>
        <p className="mt-3">9.2 Bij het einde van het beheer levert Future Content binnen een redelijke termijn de gegevens, toegang en documentatie die nodig zijn om het beheer over te dragen aan opdrachtgever of aan een derde.</p>
        <p className="mt-3">9.3 Future Content mag de overeenkomst met onmiddellijke ingang schriftelijk opzeggen of ontbinden als opdrachtgever ondanks een schriftelijke aanmaning niet betaalt, of bij faillissement, surseance van betaling of bedrijfsbeëindiging van opdrachtgever.</p>
        <p className="mt-3">9.4 Wat Future Content al heeft geleverd, blijft bij beëindiging verschuldigd.</p>
      </Artikel>

      <Artikel nr="10" titel="Eigendom en gebruiksrecht">
        <p>10.1 Op maatwerk krijgt opdrachtgever na volledige betaling een eeuwigdurend en onherroepelijk gebruiksrecht, inclusief de broncode en het recht om het door een ander te laten onderhouden of aanpassen.</p>
        <p className="mt-3">10.2 Generieke bouwstenen, modules, templates en het platform van Future Content blijven eigendom van Future Content, ook als ze in het maatwerk zitten. Draait het maatwerk op de eigen server van opdrachtgever, dan mag hij die bouwstenen als onderdeel van dat maatwerk blijven gebruiken. Hij mag ze niet los doorleveren of aan anderen in gebruik geven. Online omgevingen en tools die Future Content zelf host, mag opdrachtgever gebruiken zolang het beheer loopt.</p>
        <p className="mt-3">10.3 Future Content mag kennis, werkwijzen en algemene onderdelen opnieuw gebruiken voor andere klanten. De gegevens en vertrouwelijke informatie van opdrachtgever vallen daar niet onder (zie artikel 11).</p>
        <p className="mt-3">10.4 Bij videoproductie blijft het auteursrecht op de opnamen bij Future Content, tenzij schriftelijk anders is afgesproken. Na volledige betaling krijgt opdrachtgever een gebruiksrecht op het opgeleverde eindmateriaal voor het afgesproken doel, bijvoorbeeld Funda, de eigen website of social media. Ruw materiaal en niet-opgeleverde versies vallen niet onder dat gebruiksrecht.</p>
        <p className="mt-3">10.5 Future Content mag opgeleverd werk tonen in het eigen portfolio, op de eigen website en op eigen kanalen, zonder vertrouwelijke informatie, tenzij opdrachtgever schriftelijk aangeeft dat niet te willen.</p>
      </Artikel>

      <Artikel nr="11" titel="Geheimhouding">
        <p>11.1 Beide partijen houden vertrouwelijke informatie van de ander geheim: bedrijfsprocessen, klantgegevens, prijzen, marges, begrotingen en de inhoud van systemen die voor opdrachtgever zijn gebouwd. Die informatie wordt alleen gebruikt voor de opdracht.</p>
        <p className="mt-3">11.2 Dit geldt niet voor informatie die al openbaar was, die de ontvanger al kende, of die op grond van de wet of een rechterlijk bevel moet worden verstrekt.</p>
        <p className="mt-3">11.3 De geheimhouding blijft gelden na afloop of beëindiging van de overeenkomst.</p>
      </Artikel>

      <Artikel nr="12" titel="Gegevens, persoonsgegevens en back-ups">
        <p>12.1 De gegevens van opdrachtgever blijven van opdrachtgever. Hij kan op elk moment een export krijgen in een leesbaar formaat. Bij het einde van de samenwerking staat die export binnen vijf werkdagen klaar. Dertig dagen daarna verwijdert Future Content de gegevens uit zijn omgevingen en bevestigt dat, tenzij de wet bewaren verplicht.</p>
        <p className="mt-3">12.2 Future Content beveiligt inloggegevens en persoonsgegevens passend en werkt volgens de AVG. Hoe Future Content met persoonsgegevens omgaat staat in de privacyverklaring op future-content.nl/privacy.</p>
        <p className="mt-3">12.3 Verwerkt Future Content persoonsgegevens in opdracht van opdrachtgever, bijvoorbeeld klantdata in een bouwproject of bij beheer, dan sluiten partijen daarvoor de verwerkersovereenkomst van Future Content. Die hoort als bijlage bij de offerte.</p>
        <p className="mt-3">12.4 Opdrachtgever blijft verantwoordelijk voor back-ups van zijn eigen systemen en gegevens. Voert een systeem van Future Content op verzoek van opdrachtgever wijzigingen, verplaatsingen of opschoningen uit in zijn gegevens, dan spreken partijen vooraf af hoe dat gecontroleerd en teruggedraaid kan worden, bijvoorbeeld met een proefronde die nog niets wijzigt.</p>
      </Artikel>

      <Artikel nr="13" titel="Overmacht en continuïteit">
        <p>13.1 Geen van beide partijen hoeft een verplichting na te komen zolang dat door overmacht niet kan. Onder overmacht valt in ieder geval: ziekte of uitval van John Lavrijsen zonder tijdige vervanging, storingen bij AI-providers, hosting- of betaaldiensten, stroom- of internetstoringen, en andere omstandigheden die redelijkerwijs buiten de invloed van partijen liggen.</p>
        <p className="mt-3">13.2 Bij overmacht worden de verplichtingen opgeschort. Duurt de overmacht langer dan 30 dagen, dan mag ieder van de partijen de overeenkomst schriftelijk ontbinden voor het deel dat nog niet is uitgevoerd, zonder recht op schadevergoeding. Wat al is geleverd, blijft verschuldigd.</p>
        <p className="mt-3">13.3 Valt John Lavrijsen langer dan 20 werkdagen uit, of komt hij te overlijden, dan krijgt opdrachtgever op verzoek de broncode, de documentatie en een actuele export van zijn gegevens, zodat een derde het werk kan overnemen.</p>
      </Artikel>

      <Artikel nr="14" titel="Aansprakelijkheid">
        <p>14.1 Meldt opdrachtgever een tekortkoming, dan doet hij dat schriftelijk en geeft hij Future Content een redelijke termijn om te herstellen. Future Content herstelt eerst. Pas als herstel uitblijft of niet mogelijk is, kan opdrachtgever schadevergoeding vragen.</p>
        <p className="mt-3">14.2 Future Content is alleen aansprakelijk voor directe schade. Dat zijn: de redelijke kosten om de oorzaak en omvang van de schade vast te stellen, de redelijke kosten om schade te voorkomen of te beperken, en de redelijke kosten die opdrachtgever maakt om de prestatie alsnog aan de overeenkomst te laten beantwoorden, als Future Content niet zelf binnen een redelijke termijn heeft hersteld.</p>
        <p className="mt-3">14.3 De aansprakelijkheid is beperkt tot de factuurwaarde exclusief btw van de opdracht waaruit de schade voortkomt. Bij doorlopend beheer geldt de vergoeding over de laatste 12 maanden. In alle gevallen geldt een maximum van € 10.000 per gebeurtenis en € 25.000 per kalenderjaar. Een reeks samenhangende gebeurtenissen telt als één gebeurtenis.</p>
        <p className="mt-3">14.4 Future Content is niet aansprakelijk voor indirecte schade. Daaronder vallen gevolgschade, gederfde winst, gemiste besparingen, reputatieschade, bedrijfsstagnatie, boetes van toezichthouders, aanspraken van derden, en schade door verlies of beschadiging van gegevens voor zover een gangbare back-up die had kunnen beperken.</p>
        <p className="mt-3">14.5 De beperkingen in dit artikel gelden niet als de schade het gevolg is van opzet of bewuste roekeloosheid van Future Content.</p>
        <p className="mt-3">14.6 Opdrachtgever vrijwaart Future Content voor aanspraken van derden die verband houden met zijn gebruik van diensten of Output. Opdrachtgever staat ervoor in dat de gegevens en materialen die hij aanlevert geen rechten van derden schenden.</p>
        <p className="mt-3">14.7 Bij videoproductie geldt aanvullend: gaan opnamen verloren of zijn ze onbruikbaar, dan is Future Content verplicht tot kosteloos opnieuw opnemen waar dat redelijkerwijs kan, en anders tot terugbetaling van het bedrag dat voor die opname is gefactureerd. Andere schade rond een opname, zoals een gemiste bezichtiging, publicatie of gebeurtenis, valt onder 14.4.</p>
        <p className="mt-3">14.8 Een vordering tot schadevergoeding vervalt als opdrachtgever die niet binnen 12 maanden nadat hij de schade kende of had kunnen kennen schriftelijk bij Future Content heeft gemeld.</p>
        <p className="mt-3">14.9 Future Content heeft een beroeps- en bedrijfsaansprakelijkheidsverzekering.</p>
      </Artikel>

      <Artikel nr="15" titel="Recht en geschillen">
        <p>15.1 Op alle overeenkomsten en op deze voorwaarden is Nederlands recht van toepassing.</p>
        <p className="mt-3">15.2 Bij een geschil proberen partijen er eerst samen uit te komen. Lukt dat niet, dan is de rechtbank Oost-Brabant bevoegd, tenzij dwingend recht een andere rechter aanwijst.</p>
      </Artikel>

      <Artikel nr="16" titel="Slotbepalingen">
        <p>16.1 Blijkt een bepaling nietig of vernietigbaar, dan blijven de overige bepalingen gelden. Partijen vervangen de bepaling door een bepaling die de bedoeling zo dicht mogelijk benadert.</p>
        <p className="mt-3">16.2 Future Content mag deze voorwaarden wijzigen. De actuele versie staat op future-content.nl/voorwaarden en geldt voor overeenkomsten die daarna worden gesloten. Voor een lopende overeenkomst blijft de versie gelden die bij het akkoord hoorde.</p>
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
