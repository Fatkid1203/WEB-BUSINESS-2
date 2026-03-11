// MongoDB seed script for FashionData.Fashion collection
// Run with: node seed.js

const { MongoClient } = require('mongodb');

async function seed() {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("FashionData");
    const collection = db.collection("Fashion");

    // Clear existing data
    await collection.deleteMany({});

    const fashions = [
        // Style: Street Style (5 items)
        {
            title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in Paris",
            details: "<p>There are two street style camps in Paris this season—those who are willing to brave the cold and go coatless for the sake of fashion, and others who are bundling up in their warmest furs and scarves.</p><p>Phil Oh has captured the best of both approaches. He's also snapped a healthy mix of personal style and brand devotion—as seen by the Rick Owens obsessives who wear him head-to-toe. Follow along as Phil Oh captures the best street style from the shows here.</p>",
            thumbnail: "https://assets.vogue.com/photos/63fe0800b1dc1cd7973e57a2/master/w_1920,c_limit/00-story-image-phil-oh-paris-fall-2023.jpg",
            style: "Street Style",
            createdDate: new Date("2023-10-15")
        },
        {
            title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in Milan",
            details: "<p>Milan Fashion Week is always a feast for the eyes when it comes to street style. The city's fashion lovers bring their A-game with bold colors, luxurious fabrics, and impeccable tailoring.</p><p>From oversized coats to statement accessories, the streets of Milan during fashion week are a runway of their own.</p>",
            thumbnail: "https://assets.vogue.com/photos/63f0e4468e3aa tried/master/w_1920,c_limit/00-story-image-phil-oh-milan-fall-2023.jpg",
            style: "Street Style",
            createdDate: new Date("2023-10-10")
        },
        {
            title: "Phil Oh's Best Street Style Photos From the Fall 2023 Shows in London",
            details: "<p>London Fashion Week never disappoints when it comes to street style. The British capital brings its own unique flair with a mix of punk-inspired looks and classic tailoring.</p><p>From colorful jackets to statement boots, London's fashion crowd knows how to make an entrance.</p>",
            thumbnail: "https://assets.vogue.com/photos/63e4a8f4b1dc1cd7973e1234/master/w_1920,c_limit/StreetStyle-London.jpg",
            style: "Street Style",
            createdDate: new Date("2023-10-05")
        },
        {
            title: "Vivienne Westwood Is Remembered in London",
            details: "<p>Fashion's most rebellious designer is being celebrated across London with tributes from fans and fellow designers alike.</p><p>Vivienne Westwood's influence on punk and modern fashion continues to inspire generations of designers worldwide.</p>",
            thumbnail: "https://assets.vogue.com/photos/63a3b0c2e1e6a96e1e3fb123/master/w_1920,c_limit/Westwood-tribute.jpg",
            style: "Street Style",
            createdDate: new Date("2023-09-28")
        },
        {
            title: "The Best Street Style at New York Fashion Week",
            details: "<p>New York Fashion Week brings together the most diverse and exciting street style looks from around the world. The energy of the city is reflected in the bold, creative outfits worn by fashion enthusiasts.</p>",
            thumbnail: "https://assets.vogue.com/photos/64b5c8e1f2a3d4e5f6789abc/master/w_1920,c_limit/NYC-StreetStyle.jpg",
            style: "Street Style",
            createdDate: new Date("2023-09-20")
        },
        // Style: Trends (4 items)
        {
            title: "Why the Short Suit Should Be Your Next Spring Investment",
            details: "<p>The short suit is making a major comeback this season. From Bermuda shorts paired with matching blazers to tailored sets in pastel hues, this trend offers a fresh take on power dressing.</p><p>Perfect for both the office and weekend brunch, the short suit is versatile, stylish, and effortlessly cool.</p>",
            thumbnail: "https://assets.vogue.com/photos/63d5e7f8a1b2c3d4e5f6789a/master/w_1920,c_limit/short-suit-trend.jpg",
            style: "Trends",
            createdDate: new Date("2023-11-01")
        },
        {
            title: "Is This the Trend Report of the Future? An AI Interprets the Fall 2023 Menswear Season",
            details: "<p>Artificial intelligence is now being used to analyze and predict fashion trends. By processing thousands of runway images, AI can identify emerging patterns, colors, and silhouettes.</p><p>This groundbreaking approach to trend forecasting could revolutionize how the fashion industry operates.</p>",
            thumbnail: "https://assets.vogue.com/photos/63c4d6e7f8a9b0c1d2e3f456/master/w_1920,c_limit/AI-fashion-trend.jpg",
            style: "Trends",
            createdDate: new Date("2023-10-25")
        },
        {
            title: "What Street Style Looked Like a Decade Ago",
            details: "<p>Looking back at street style from ten years ago reveals just how much fashion has evolved. From skinny jeans to oversized everything, the transformation has been dramatic.</p><p>Yet some things remain timeless—great personal style always shines through regardless of the era.</p>",
            thumbnail: "https://assets.vogue.com/photos/63b3c5d6e7f8a9b0c1d2e345/master/w_1920,c_limit/decade-ago-style.jpg",
            style: "Trends",
            createdDate: new Date("2023-10-18")
        },
        {
            title: "Men, Skirts Aren't That Scary—Promise!",
            details: "<p>The men's skirt trend continues to gain momentum as more designers and celebrities embrace this boundary-pushing look. From utilitarian kilts to flowing midi skirts, there's a style for everyone.</p><p>Breaking gender norms in fashion has never looked so good.</p>",
            thumbnail: "https://assets.vogue.com/photos/63a2b4c5d6e7f8a9b0c1d234/master/w_1920,c_limit/men-skirts-trend.jpg",
            style: "Trends",
            createdDate: new Date("2023-10-12")
        },
        // Style: Casual (4 items)
        {
            title: "The Ultimate Guide to Casual Chic Dressing",
            details: "<p>Casual chic is all about looking effortlessly put-together. Think well-fitted jeans, crisp white sneakers, and a perfectly tailored blazer.</p><p>The key is in the details—quality fabrics, neutral colors, and minimalist accessories can elevate any casual outfit to new heights.</p>",
            thumbnail: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
            style: "Casual",
            createdDate: new Date("2023-11-05")
        },
        {
            title: "Weekend Wardrobe Essentials for Every Season",
            details: "<p>Building a versatile weekend wardrobe doesn't have to be complicated. Start with comfortable basics like well-fitting t-shirts, relaxed-fit trousers, and a good pair of sneakers.</p><p>Layer with lightweight jackets and cardigans for transitional weather.</p>",
            thumbnail: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
            style: "Casual",
            createdDate: new Date("2023-10-30")
        },
        {
            title: "How to Master the Art of Smart Casual",
            details: "<p>Smart casual is perhaps the most confusing dress code, but it doesn't have to be. The trick is to blend relaxed pieces with more polished elements.</p><p>A button-down shirt with chinos, loafers, and a leather belt is a fail-safe combination that works for almost any occasion.</p>",
            thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
            style: "Casual",
            createdDate: new Date("2023-10-22")
        },
        {
            title: "Minimalist Fashion: Less Is More",
            details: "<p>Minimalist fashion embraces simplicity and functionality. Clean lines, neutral palettes, and high-quality materials define this timeless approach to dressing.</p><p>By focusing on fewer, better pieces, you can create a wardrobe that is both sustainable and stylish.</p>",
            thumbnail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
            style: "Casual",
            createdDate: new Date("2023-10-15")
        }
    ];

    const result = await collection.insertMany(fashions);
    console.log(`Inserted ${result.insertedCount} fashion documents`);
    console.log("Styles: Street Style (5), Trends (4), Casual (4)");
    console.log("Total: 13 documents");

    await client.close();
    process.exit(0);
}

seed().catch(err => {
    console.error("Error seeding data:", err);
    process.exit(1);
});
